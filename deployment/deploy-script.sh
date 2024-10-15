echo "Deploying from bash script!"

go version
#cd ~/github/socialhub/src
#go build -o build/socialhub .
echo "Build is present"

cp ~/github/socialhub/src/env/configs/prod.sample ~/github/socialhub/src/env/env.go
cd ~/github/socialhub/deployment
#chmod u+x ~/github/socialhub/src/build/socialhub

sudo cp -ar ../view/. /var/www/html
sudo cp nginx/default /etc/nginx/sites-enabled/default
# sudo cp ../socialhub.service /etc/systemd/system/
# sudo systemctl daemon-reload // only needed when socialhub.service file changes
sudo systemctl restart socialhub.service

sudo nginx -t # test nginx conf
sudo systemctl restart nginx
