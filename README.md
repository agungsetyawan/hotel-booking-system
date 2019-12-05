# Hotel Booking System (Agung Setyawan)

## Features!
  - Hash password with bcrypt
  - Middleware for authentication using JWT

### API Documentation
This is the link for API documentation **https://documenter.getpostman.com/view/3940538/SWE3cKmz**
which can be exported with Postman.

### Tech
This project uses a number of open source projects to work properly:
* [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.
* [sequelize](https://www.npmjs.com/package/sequelize) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. 
* [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js with focus on performance.
* [express-validator](https://www.npmjs.com/package/express-validator) - An express.js middleware for validator.
* [bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens.
* [lodash](https://www.npmjs.com/package/lodash) - The Lodash library exported as Node.js modules.
* [multer](https://www.npmjs.com/package/multer) - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. 

### Installation
Endpoint to http://localhost:3000
```sh
// install dependencies
$ npm install

// migrate database
$ ./node_modules/sequelize-cli/lib/sequelize db:create
$ ./node_modules/sequelize-cli/lib/sequelize db:migrate
$ ./node_modules/sequelize-cli/lib/sequelize db:seed:all

// run your app
$ npm start
```

### Environment
Don't forget config **.env** file with your environment MySQL
```
DB_DATABASE=hotel_test
DB_USER=root
DB_PASS=root
DB_HOST=localhost
JWT_SECRET=5ecr3tMAX
```
