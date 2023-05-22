package store

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	models "socialhub-server/model/sqlc"
	"socialhub-server/pkg/plogger"
	"sync"
)

const (
	dbSource = "postgres://admin:I89Yn4ebUIrxDvtUba@localhost:5432/postgres?sslmode=disable"
	dbDriver = "postgres"
)

type Store interface {
	models.Querier
	Execute(statement string, args ...interface{}) error
	Query(statement string, args ...interface{}) *sql.Rows
	ExecTx(ctx context.Context, fn func(*models.Queries) error) error
}

type SQLStore struct {
	*models.Queries
	conn *sql.DB
}

var sqlInstance *SQLStore

var lock = &sync.Mutex{}

func GetInstance() *SQLStore {
	if sqlInstance == nil {
		lock.Lock()
		defer lock.Unlock()
		if sqlInstance == nil {
			plogger.Info("Creating single instance now.")
			conn, err := sql.Open(dbDriver, dbSource)
			if err != nil {
				plogger.Error("connect to db failed !", err)
				panic(err)
			}
			sqlInstance = newStore(conn)
			plogger.Info("Successfully connected to database!")
		} else {
			plogger.Info("Single instance already created.")
		}
	}

	return sqlInstance
}

func newStore(conn *sql.DB) *SQLStore {
	return &SQLStore{
		conn:    conn,
		Queries: models.New(conn),
	}
}

func (store *SQLStore) Execute(statement string, args ...interface{}) error {
	_, err := store.conn.Exec(statement, args...)

	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (store *SQLStore) Query(statement string, args ...interface{}) *sql.Rows {
	result, err := store.conn.Query(statement, args...)

	if err != nil {
		log.Println(err)
		return nil
	}
	// defer result.Close()

	log.Println(result.Columns())
	return result
}

//func (store *SQLStore) BeginTx(ctx context.Context, opts *sql.TxOptions) *sql.Tx {
//	tx, _ := store.conn.BeginTx(ctx, opts)
//	return tx
//}

func (store *SQLStore) ExecTx(ctx context.Context, fn func(*models.Queries) error) error {
	tx, err := store.conn.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	q := models.New(tx)
	err = fn(q)
	if err != nil {
		if rbErr := tx.Rollback(); rbErr != nil {
			return fmt.Errorf("tx err: %v, rb err: %v", err, rbErr)
		}
		return err
	}
	return tx.Commit()
}
