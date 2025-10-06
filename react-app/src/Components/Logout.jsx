import { useNavigate } from 'react-router-dom';
import './Logout.css'
import { useEffect } from 'react';

function Logout(){

    const nav = useNavigate();

    const logoutHandler = async (e) => {
        
        try{
            const push = await fetch("http://localhost:8080/logout",{
                method: "POST",
                credentials: "include"
            });

            if(push.ok)
            {
                sessionStorage.clear();
                
                console.log("LogOut Working");
                setTimeout(() => {
                    nav("/Login");
                },2000);
                
            }
        }
        catch{
            console.log("Logout Error Try again");
        }
    };
    
    return(
        <>
        <div className="logout" onClick={logoutHandler}>
            Logout
        </div>
        </>
    );
}

export default Logout;