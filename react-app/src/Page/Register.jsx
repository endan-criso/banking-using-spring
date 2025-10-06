    import React, { useEffect, useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import './Register.css'

    function Register(){
        
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [success, setSuccess] = useState("");
        const navigate = useNavigate();

        useEffect(() => {
            if(success == "Account has created successfully")
            {
                setTimeout(() => {
                    navigate("/Login");
                }, 2000);
            }
        }), [success];

        const handleSubmit = async (e) => {
            e.preventDefault();

            setSuccess(null);

            const requestPayload = {
                name: name,
                email: email,
                password: password
            };

            try{
                const response = await fetch("http://localhost:8080/api/auth/register",{
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(requestPayload)
                
                });

                if(response.ok){
                    setSuccess("Account has created successfully");
                    setEmail("");
                    setName("");
                    setPassword("");
                }else if(response.status == 409){
                    setSuccess("Email is already exists");
                }
                else
                {
                    const errTex = await response.text();
                    setSuccess("Error in connectivity try again later");
                }

            }
            catch (err){
                
                setSuccess("Connetivity issue try again later")
                console.log("Cannot connect to backend");
            }
        };

        return(
            <>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>

                    <div className="input-box">
                        <input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    {success &&
                    <div className="register-link-2">
                        <p style={{color: "red"}}>{success}</p>
                    </div>
                    }

                    <div className="register-link-2">
                        <p>I have an account <Link to={"/Login"}>Login</Link></p>
                    </div>


                    <button type="submit">Sign Up</button>
                </form>
            </div>
            </>
        )
    }

    export default Register;