echo "Deploying from bash script!"

chmod u+x ~/github/socialhub/src/build/socialhub

sudo cp -ar ../view/. /var/www/html
sudo cp nginx/default /etc/nginx/sites-enabled/default
sudo cp ../socialhub.service /etc/systemd/system/

sudo systemctl daemon-reload
sudo systemctl restart socialhub.service
sudo systemctl enable socialhub.service

sudo service nginx restart

