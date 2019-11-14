require('dotenv').config()
import express from "express";
import passport from 'passport';
//import Auth0Strategy from 'passport-auth0';
import uid from 'uid-safe';
// eslint-disable-next-line no-unused-vars
import session from 'express-session';
import path from 'path';
import parser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan   from 'morgan';
//import "./util/auth0";
import './util/authFacebook'
//import authRoutes from './Routers/auth-routes';
import authRoutes from './Routers/facebook-route';
import './database/mongodb/dbMongo';

const server = express();
    
     // 2 - add session management to Express
  const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000 // 24 hours in milliseconds
    },
    resave: false,
    saveUninitialized: true
  };
  
  //process.env.NODE_ENV !== "production" ?app.use(await cookieParser()):null;
    server.use(morgan("dev"));
    server.use(parser.json());//permite usar json
    server.use(parser.urlencoded({extended:false}))
    server.use(parser.raw())//permite upload file
    server.use(cookieParser());
    server.use(session(sessionConfig));
    
 // 5 - adding Passport and authentication routes
    server.use(passport.initialize());
    server.use(passport.session());
    

// 6 - you are restricting access to some routes
const restrictAccess = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect("/login");
    next();
  };

  server.use("/profile", restrictAccess);
  server.use(authRoutes);
  

export default server;