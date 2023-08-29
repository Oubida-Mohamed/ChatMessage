import { createContext } from "react";
import React, { useState} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export const UserContext = createContext()

export const UserContextProvider = ({children}) =>{
    const Navigate = useNavigate()

    const [login, setLogin] = useState({
        email:"",
        password:""
      });
    
    const[error,setError]=useState("")

    const handleEmailChange = (event) => {
        setLogin({...login,email:event.target.value});
      };
    
    const handlePasswordChange = (event) => {
        setLogin({...login,password:event.target.value});
      };

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
          const checkLogin = await axios.post('http://localhost:5000/api/users/login',login)
          if(checkLogin.status === 200){
            window.location.reload();
            localStorage.setItem('token', JSON.stringify(checkLogin.data))
          }
    
        }catch(error){
          setError(error.response.data);
        }
      }


    const[signUp,setSignup] = useState({
      name:"",
      email:"",
      password:"",
      isAdmin:false
    })

    const accountType = (event) => {
      setSignup({ ...signUp, isAdmin: event.target.value});
    };
    


    const handleName = (event) => {
      setSignup({...signUp,name:event.target.value});
    };
  

    const handleEmail = (event) => {
      setSignup({...signUp,email:event.target.value});
    };
  
    const handlePassword = (event) => {
    setSignup({...signUp,password:event.target.value});
    };

    const handleRegister = async(event)=>{
      event.preventDefault();
      try{
        const checkRegister = await axios.post('http://localhost:5000/api/users/register',signUp)
        if(checkRegister.status === 200){
          Navigate('/')
        }
      }catch(error){
        setError(error.response.data);
      }
    }



    return <UserContext.Provider value={
        {login,error,handleEmailChange,handlePasswordChange,handleSubmit,handleLogout,
          handleName,handleEmail,handlePassword,handleRegister,signUp,accountType
        }
    }

>{children}</UserContext.Provider>
}