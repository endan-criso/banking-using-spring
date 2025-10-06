import React, { useEffect, useState } from "react";
import './Login.css'
import { Link, useNavigate } from "react-router-dom";

function Login(){

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[success, setSuccess] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if(success == "ok")
        {
            setTimeout(() => {
                navigate("/dashboard")
            },2000);
        }
    }),[success];

    const handleLogin = async (e) => {
        e.preventDefault();

        setSuccess(null);

        const payload = {
            email: email,
            password: password
        };

            const response = await fetch("http://localhost:8080/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(payload),
                    credentials: 'include'
                });

                if(response.ok)
                {
                    setSuccess("ok")
                }
                else
                {
                    setSuccess("invalid");
                }
    };


    return(
        <>
        <div className="wrapper">
            <form onSubmit={handleLogin}>
                <h1>Sign In</h1>
                <div className="input-box">
                    <input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>

                <div className="input-box">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>

                <div className="forgot-password">
                    <a href="#">Forgot password</a>
                </div>
                
                {success == "invalid" && 
                <div className="register-link"><p style={{color:"red"}}>Invalid Email or Password</p></div>
                }

                <button type="submit">Login</button>

                <div className="register-link">
                    <p>Don't have account? <Link to={"/register"}>Register</Link></p>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login;