# Shoham SIEM System: Admin Panel

## What it does ?
Based NodeJS Back-end & jQuery-HTML Front-end
This is web-client to manage Shoham and monitor, [theme is used SB-Admin2](https://github.com/BlackrockDigital/startbootstrap-sb-admin-2 "theme is used SB-Admin2").

## How to use ?
- Under *src/utilities* there is some scripts using DB 'mongodb://siem.davidt.net:27018'
	need to update it to relevante DB
- At *src/routers/general_router.js*  find '/is-logger-alive' and update logger address
- Please make sure to add default values to DB, you can [download it from here](https://files.fm/u/g4k6pvdu "download it from here") or [from here](https://1drv.ms/u/s!An0OKyeC4HO3gjK9eLfC5Dvx6PDS?e=TF4B27 "from here").

###### This was tested in 'CentOS 7' with NodeJS installed.
1. Clone project to your machine.
2. run `npm i` from root folder
3. when 2 is finish, run `node src/app.js`

Server is up, reach to "localhost:3000"


#### Default user
**Username:** admin@gmail.com 
**Password:** admin123
