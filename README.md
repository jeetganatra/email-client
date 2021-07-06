<h1 align="center">
Email Client
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux, Nodejs
</p>

> Email client is a website where people can schedule mails.


## Clone or Download
```terminal

git clone https://github.com/jeetganatra/email-client.git

npm i
```


## Project Structure

.gitignore

Backend/

   package.json
   
   server.js
   
   ...
   
   ...
   
Frontend/

   package.json
   
   index.html
   
   index.js
   
   App.js
   
   ...
   
   ...
 

# Usage (run fullstack app on your machine)

## Prerequirements
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

Notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal

$ cd Frontend   // go to client folder

$ npm i         // npm install pacakges

$ npm start     // run it locally
```


## Server-side usage(PORT: 5000)

### Prepare your .env file in the /Backend directory
1) You need to add a jwt secret string in the .env file

    ``jwt_secret="your string" ``

2) You need to add your MongoDB ATLAS URL

    ``ATLAS_URL ="Your mongoDB ATLAS url``

3) You need to add your gmail account credentials for sending mail

    ``SENDER_MAIL = "your gmail address" ``
 
    ``SENDER_PASSWORD="password of your gmail address" ``

### Start

```terminal
$ cd Backend   // go to server folder

$ npm i       // npm install pacakges

$ node server.js // run it locally
```

# Screenshots of this project

## Home Page / Login Page
![User can login (sign in or sign up) here.](https://i.imgur.com/NxQTmX1.png)

## After signing in user can go to account route and make request to token-protected API endpoint
![After signing in user can go to account](https://i.imgur.com/MP5MzK5.png)

## User can compose an email and either directly send it or schedule a reccuring email as per their requirement
![Compose email pop-up](https://i.imgur.com/kCqC8BS.png)

⚠️ Note :- Currently only limited number of recurring emails will be send due to server limitations



## Standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## BUGs or comments

[Create new Issues](https://github.com/jeetganatra/email-client/issues) (preferred)

Email Me: jeetganatra138@gmail.com 

## Authors
[Jeet Ganatra](https://github.com/jeetganatra)

[Krunal Shastri](https://github.com/krunalshastri)

[Ishan Chopra](https://github.com/ishanc008)

### License
[MIT](https://github.com/jeetganatra/email-client/blob/master/LICENSE)
