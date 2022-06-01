# doctorApp

## MySQL Workbench

To connect to the database, modify the server/config/config.json file the username and password for your MySQL.

```json
"development": {
    "username": "root", // modify
    "password": "toor", // modify
    "database": "medical", // you must create a database with this name in MySQL
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```

Connect to MySQL and create a new database with the name __medical__.

## Run the app
To install the dependencies use: npm install.

Open two terminals

```bash
cd server
npm start
```

```bash
cs client
npm start
```
