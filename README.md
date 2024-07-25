# Jewellery Invoice generator

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #default-branch-switch -->

```
For MYSQL DB setup 
——————————————
connect locally to vm 
ssh -L 5433:localhost:5555  -— for postgres

--SSh tunnel in gcp vm
ssh -L 5433:localhost:5432 vikas@IP

installation 
sudo apt -y install postgresql
sudo apt install postgresql postgresql-contrib

sudo su - postgres -c psql

psql -h localhost -p 5432 -U admin -d smswebsite //sms

CREATE USER admin WITH PASSWORD ‘varsha’;
create DATABASE smswebsite

GRANT ALL PRIVILEGES ON DATABASE smswebsite TO admin;


sudo apt update
sudo apt install unzip


sudo apt update


sudo apt install nodejs npm
sudo apt install nodejs



HTTPS=true npm start

postgres status

sudo systemctl status postgresql


full contrl mode 


process manager
sudo apt-get update
sudo apt-get install supervisor

start 

/etc/supervisor/conf.d/

sudo supervisorctl reread
sudo supervisorctl update

——————————————————————————

sudo supervisorctl status

system ctl status
sudo systemctl status
sudo supervisorctl status

location in vm
/etc/supervisor

supervise mode
react_sunar

self certicate

port - 3000 /80


/home/vsjewelsolution/jeweller-app


sudo ln -s /etc/nginx/sites-available/sunar-webapp.conf /etc/nginx/sites-enabled/sunar-webapp.conf


HTTPS=true

sudo supervisorctl stop all

sudo supervisorctl restart all


gunicorn -w 2 -b 0.0.0.0:8000 --certfile=/Users/vikas/Downloads/sunarms_/certificate.crt --keyfile=/Users/vikas/Downloads/sunarms_/private.key app.main:app


sudo systemctl stop nginx

sudo netstat -tlpn | grep ':80'

Caddy commands

caddy stop
sudo caddy start

/etc/supervisor/conf.d/

gunicorn -w 4 -b 0.0.0.0:8000 --log-level=debug  app.main:app


gunicorn -w 4 -b 0.0.0.0:8000 --log-level=debug  invoice_backend.app.main:app

netstat -tlpn | grep ':8000'
sudo kill -9 pid

https://blog.jayanthk.in/deploying-backend-apis-on-a-cloud-instance-a-step-by-step-guide-4f77c4db4a8f


nginx

sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d dev.sunarms.co.in
sudo systemctl restart nginx

if machine stop
inside the caddy file folder

— restart caddy in fronend vm


log files
/var/log/```



## The idea behind the example



## What's next?

<!-- #default-branch-switch -->

You now have a working example project.
You can head back to the documentation and continue by browsing the [templates](https://mui.com/material-ui/getting-started/templates/) section.
