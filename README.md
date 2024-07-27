# Jewellery Invoice generator

###Landing page
![image](https://github.com/user-attachments/assets/892cf1fe-89b1-4c08-a96d-becd05becb69)

### login
![image](https://github.com/user-attachments/assets/8d808a49-c71d-47bb-b1c8-dd8c662e2269)

### landing page
![image](https://github.com/user-attachments/assets/63c5b2d5-a130-416f-aa72-968de24d980e)

### customer view and create 
![image](https://github.com/user-attachments/assets/b2475317-0639-45fb-a19e-68d866b2fb16)

### invoice 
![image](https://github.com/user-attachments/assets/65d0ef65-3f2b-4eba-80fc-77c0f939f788)


### Configs/ Library and tools
- connection with gcp vm 
- https connection via caddy 
- process manager via supervisor
- ngnix, gunicorn for backend, frontend app server
- mysql for backend db

## How to use

## For dev env
```npm install
npm run
```

for backend
```python3 main.py```


```//For MYSQL DB Connections
//Backend VM Installations
——————————————
connect locally to vm 
ssh -L 5433:localhost:5555  -— for postgres
ssh -L 5433:localhost:5432 vikas@IP

installation 
sudo apt -y install postgresql
sudo apt install postgresql postgresql-contrib

sudo su - postgres -c psql

psql -h localhost -p 5432 -U admin -d smswebsite

CREATE USER admin WITH PASSWORD ‘varsha’;
create DATABASE smswebsite;
GRANT ALL PRIVILEGES ON DATABASE smswebsite TO admin;


sudo apt update
sudo apt install unzip


// frontend VM Machine

sudo apt install nodejs npm
sudo apt install nodejs

// command to enable https in local mode
HTTPS=true npm start

//postgres status
sudo systemctl status postgresql


//process manager installtion
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

// location in vm
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

// running the backed application flask app
gunicorn -w 2 -b 0.0.0.0:8000 --certfile=/Users/vikas/Downloads/sunarms_/certificate.crt --keyfile=/Users/vikas/Downloads/sunarms_/private.key app.main:app

// system health
sudo systemctl stop nginx
sudo netstat -tlpn | grep ':80'

// Caddy server for https installtion 
caddy stop
sudo caddy start

/etc/supervisor/conf.d/

// local mode command for flask app
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
