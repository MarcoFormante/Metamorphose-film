import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../middleware/axiosInstance'
import { useNavigate } from 'react-router-dom'
import Fallback from '../../components/Spinner/Fallback'



const Login = ({isAuth,setIsAuth}) => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const [csrf,setCsrf] = useState(null)
    const navigate = useNavigate()


    useEffect(()=>{
       
            axiosInstance.get("csrfToken")
            .then(res =>{
                if (res.status === 200) {
                    const csrfToken =  res.data?.csrfToken 
                    axiosInstance.defaults.headers.post['X-CSRF-Token'] = csrfToken
                    axiosInstance.defaults.headers.delete['X-CSRF-Token'] = csrfToken
                    setCsrf(csrfToken)
                }
            }).catch(err => {
                console.error("error csrfToken not Valid");
            })
        
    },[])


    const checkLogin = async(e)=>{
        e.preventDefault()
        if (!username || !password) {
            return
        }
        setLoading(true)
        const formData = new FormData(e.target)
        formData.append("csrfToken",csrf)
        axiosInstance.post('login',formData)
        .then((res)=>{
            if (res?.data?.token) {
                const token = res.data.token
                axiosInstance.defaults.headers.common = {
                    'Authorization': 'Bearer ' + token,
                };
                sessionStorage.setItem("token-ad",token)
                
                setIsAuth(true)
              
                navigate("/admin/home")
            }
        })
        .catch((err)=>{
            console.error("Error during login");
        }).finally(()=>{
            setLoading(false)
        })
    }


  return (csrf || isAuth) && !loading &&   (
    <>
     {loading && <Fallback/>}
    <form onSubmit={checkLogin} id='login-form'>
        <div>
            <label htmlFor="user">Username</label>
            <input type="text" id='user' name='username' value={username.trim()} onChange={(e)=> setUsername(e.target.value)} maxLength={100}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' name='password' maxLength={100} value={password.trim()} onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <input type="submit" value="SUBMIT" id='submit-btn' />
    </form>
    </>
  )
}

export default Login