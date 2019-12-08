import { Router } from 'express';
import User_  from "../database/mongodb/Schema";
import passport from 'passport';
//import { pool } from '../database/mysql/db_mysql';
const route = Router();

route.post('/singin',passport.authenticate('local.singIn',{session:true}),(req,res)=>{
                
        return res.redirect("/profile") //res.json({user:req.user})
    })
route.post('/singup',passport.authenticate('local.singUp',{session:true}),(req,res)=>{
    return res.json({user:req.user})
        })

route.get('/logout',async (req, res)=>{ 
    req.logOut()
    return res.redirect("/")

  }) ;

route.get('/a',async (req, res)=>{    
    
    console.log(
    
    req.isAuthenticated())
    const data = await User_.find()
    return res.json({data})
})


export default route;