# NODEJS sample REST API with Express, ES6 and MongoDB

## MongoDB Installation
 - sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
 - echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
 - sudo apt-get update
 - sudo apt-get install -y mongodb-org 
 - sudo service mongod start

## Create MongoDB Database
 - mongo --quiet
 - show dbs;
 - use invoiceTest;
 - db.createCollection("products");

## Server Installtion
 - npm install
 - npm run start

