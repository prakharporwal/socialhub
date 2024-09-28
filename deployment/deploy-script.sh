echo "Deploying from bash script!"

#go version
#cd ~/github/socialhub/src
#go build -o build/socialhub .
echo "Build is present"

cp ~/github/socialhub/src/env/configs/prod.sample ~/github/socialhub/src/env/env.go
cd ~/github/socialhub/deployment
#chmod u+x ~/github/socialhub/src/build/socialhub

sudo cp -ar ../view/. /usr/share/nginx/html
sudo cp nginx/default /etc/nginx/sites-enabled/default.conf
sudo cp ../socialhub.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl restart socialhub.service

sudo systemctl restart nginx
