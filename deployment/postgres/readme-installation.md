for searching for postgres available version using yum search postgres -> i found postgres15

- on ubuntu
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04


[](https://devopscube.com/install-configure-postgresql-amazon-linux/)

- get location of conf file to enable remote connection to postgres
- ` sudo -u postgres psql -c 'SHOW config_file' ` -> /etc/postgresql/16/main/postgresql.conf
- Locate the line that starts with “listen_addresses“. 
- Uncomment and change it to “listen_addresses = ‘*’“. This will allow connections from any IP address.
- security group in AWS needs to be updated

- connect from Local using SSH tunnelling - needs to be figured out
- 
