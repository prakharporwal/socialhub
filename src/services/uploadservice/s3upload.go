package uploadservice

import (
	"socialhub-server/pkg/plogger"
)

func init() {
}

func Upload() {
	plogger.Info("upload started!")

	//endpoint := "play.min.io"
	//accessKeyID := "Q3AM3UQ867SPQQA43P2F"
	//secretAccessKey := "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG"
	//useSSL := true
	//
	//minioClient, err := minio.New(endpoint, &minio.Options{
	//	Creds:  credentials.NewStaticV4(accessKeyID, secretAccessKey, ""),
	//	Secure: useSSL,
	//})
	//if err != nil {
	//	log.Fatalln(err)
	//}
	//
	//log.Printf("%#v\n", minioClient) // minioClient is now set up}
	//
	//bucketName := "testbucket"
	//location := "us-east-1"
	//
	//err = minioClient.MakeBucket(context.Background(), bucketName, minio.MakeBucketOptions{Region: location})
	//if err != nil {
	//	// Check to see if we already own this bucket (which happens if you run this twice)
	//	exists, errBucketExists := minioClient.BucketExists(context.Background(), bucketName)
	//	if errBucketExists == nil && exists {
	//		log.Printf("We already own %s\n", bucketName)
	//	} else {
	//		log.Fatalln(err)
	//	}
	//} else {
	//	log.Printf("Successfully created %s\n", bucketName)
	//}
}
