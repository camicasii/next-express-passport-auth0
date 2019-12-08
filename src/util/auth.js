import passport from 'passport';
import passportLocal from 'passport-local';
import User from '../database/mongodb/Schema';
import helpers from "./bcryptHast";

const LocalStrategy = passportLocal.Strategy;

passport.use('local.singIn',
new LocalStrategy({
    usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
},
async ( req, username, password, done)=>{          
    const isUser_ = await isUser(username)    
    if(isUser_){          
        const ID = isUser_._id        
        const isPassword_ =await isPassword(password,ID)
        if (isPassword_){
            const user = isUser_;
            return done(null,user);    
        }
        else return done(null, false);
    }      
    return done(null, false);        
}
));

passport.use('local.singUp',
new LocalStrategy({
    usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
},
async ( req, username, password, done)=>{   
    
    const isUser_ =await isUser(username)   
    if(!isUser_){                
        const user = await createUser(username,password);
        if(user)
        return done(null,user);
        else
        return done(null,false);
     }
     else
     return done(null,false);        
   }     
));


passport.serializeUser((user, done) => {
  done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const rows = await User.findById(id)
    return done(null, rows);
  });

  const isUser =async(username)=>{
    const rows = await User.findOne({username})        
    if(rows!= null) return rows;
    else return false;
  }
  const isPassword=async(password,ID)=>{      
    const rows= await User.findById(ID);
    const passportSave =rows.password
    const isPassword_ = await helpers.desEncrypt(password,passportSave)    
    return isPassword_
  }


  const createUser =async(username,password)=>{    
    const encryptPassword  =await helpers.encrypt(password);
    const newUser ={
        username,
        password:encryptPassword
    }        
    const  newUser_= new User(newUser)
    
    const rows =await newUser_.save().then(()=>true).catch(()=>false);

    
    
    
    
    
    
    return rows;
  }