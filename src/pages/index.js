import {useRef, useEffect} from 'react'
import Axios from 'axios';

export default function(){
    const username = useRef(null)
    const password = useRef(null)
    
    return(
        <div class="row">
        <div class="col s12">
          <div class="row">
          <form action="/singin" method="POST">
            <div class="input-field col s12">              
              <input type="text" id="autocomplete-input" class="autocomplete"
                  ref={username} name="username"
              />
              <label for="autocomplete-input">Username</label>
            </div>
            <div class="input-field col s12">              
              <input type='password' id="autocomplete-input-password" class="autocomplete"
                  ref={password} name="password"
              />
              <label for="autocomplete-input-password">password</label>
            </div>
            <button type="submit">envial</button>
            
            </form>
          </div>
        </div>
      </div>
    );
}

const useData=async(e,username,password)=>{
  e.preventDefault()
  const username_=username.current.value
  const password_=password.current.value
  const data ={username:username_,
  password:password_}
  const res = await Axios.post("/singin",data).catch((e)=>console.log(e));
  console.log(res);
  
  

}