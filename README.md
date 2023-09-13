# Shopwell

A Web app that allows users to scan product barcodes and displays useful info about them.

## Technologies

The web application was built using MERN stack technologies; i.e., React, Node, Express and MongoDB.

![mern stack](https://drive.google.com/uc?id=17Nd3A9ItvA-bIsaxaKlOV2Nt9u_b3l0V)

### Frontend

The React app utilizes various different frontend libraries, such as:

* Redux toolkit for managing application state

* Material UI as the design library

* Axios as a HTTP client for JavaScript

* React router for routing inside the React app

* Formik and Yup for form managment

* Socket.io for notifications inside the website

<br>

![frontend](https://drive.google.com/uc?id=1PNK6TV_3L25f6JYCCPf2yLpmS0wtv44Q)

### Backend

A Node Express Server writtend in TypeScript, uses the following technologies:

* Mongoose ODM for MongoDB

* JWT for user authentication

* Jest and Supertest for unit testing

* Socket.io for notifications

* Handlebars templating engine for email templates

* Cloudinray for image uploading

<br>

![backend](https://drive.google.com/uc?id=12PwxEUyoCoYE6vyKmU9rmZa8NTquVtvM)

### Database

The project uses a Cloud based database, hosted on MongoDB Atlas. The database has the following collections:

* Users

* Products

* Product reviews

* Restrictions

* Restrictions suggestions

* Activities

* Scans per day

The database also hosts a few triggers that are called after newly performed CRUD operations on the Users and Products collections. These triggers keep track of new activities that are saved in the Activities collection.

![database](https://drive.google.com/uc?id=1IpF9iNwvrL3Q1S8mIcvwAEDATEXV-h1L)

## Scripts
