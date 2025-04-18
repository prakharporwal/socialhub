set -e -v -x

cd
# install go
wget https://go.dev/dl/go1.23.0.linux-amd64.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.23.0.linux-amd64.tar.gz
# set in path
echo PATH=$PATH:/usr/local/go/bin >> ~/.profile

source ~/.profile
go version
