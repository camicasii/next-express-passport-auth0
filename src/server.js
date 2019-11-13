require('dotenv').config()
import express from "express";
import next from 'next';
import http from 'http';
// eslint-disable-next-line no-unused-vars
import session from 'express-session';
import path from 'path';
import parser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan   from 'morgan';
import passport from 'passport';
//import './util/auth'
const dev = process.env.NODE_ENV !== "production";

const app = next({
    dev,
    dir: "./"
})
const handle = app.getRequestHandler();

app.prepare().then(()=>{
    const server = express();
     
    // handling everything else with Next.js
    server.get("*",handle);
    http.createServer(server).listen(process.env.PORT,()=>console.log(`listening on port ${process.env.PORT}`));



})


