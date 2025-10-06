import { useEffect, useState } from 'react';
import Logout from '../Components/Logout'
import './Dashboard.css'
import { Link } from 'react-router-dom';



function Dashboard()
{
    const[profile, setprofile] = useState(null);
    const[error, setError] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    

    useEffect(() => {
        const getprofile = async (params) => {
            
            try{
                const request = await fetch("http://localhost:8080/api/user/profile",{
                    method: "GET",
                    credentials: 'include'
                });

                if(request.ok)
                {
                    const data = await request.json();
                    setprofile(data);
                }
                else
                {
                    setError("Failed to fetch");
                }
            }
            catch{
                console.log("Error with client & server com");
            }
        };
        getprofile();
    }, []);

    if(!profile)
    {
        return(
            <div>
                loading
            </div>
        );
    }


    return(
        <>
        <div className="container">
            <Logout/>
            <div className='account-info'>
                <div className='intro'>
                    <h1>Welcome,</h1>
                    <p>{profile.name}</p>
                </div>
                <div className='accNo'>{profile.accNo}</div>
                <div className='cash'><p style={{fontSize:"17px"}}>Available: </p>{profile.cash}</div>
            </div>


            <div className='other-op'>
                <div className='merge'>
                    <div className='send'><span><Link to={"/send"} className='link-edit'>Send</Link></span>
                    </div>
                    <div className='history'><Link to={"/history"}>History</Link></div>
                </div>
            </div>
        </div>
        </>

    );
}

export default Dashboard;