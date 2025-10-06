import { Link, useNavigate } from 'react-router-dom';
import './Sender.css'
import { useState } from 'react';

function Sender(){

    const[email, setEmail] = useState(() => sessionStorage.getItem("EMACOOKIE" || ""));
    const[senderAcc, setSenderAcc] = useState(() =>  sessionStorage.getItem("NOCOOKIE" || ""));
    const[amount, setAmount] = useState(() => sessionStorage.getItem("AMCOK" || ""));
    const[result, setResult] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        const payload = {
            receiverEmail: email,
            accountNo: senderAcc,
            cash: parseFloat(amount)
        };
        
        const response = await fetch("http://localhost:8080/user/send",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(payload)
        });

        if(response.status == 401)
        {
            navigate("/Login");
            return;
        }

        if(response.ok)
        {
            setResult("successful");

            sessionStorage.removeItem("EMACOOKIE");
            sessionStorage.removeItem("NOCOOKIE");
            sessionStorage.removeItem("AMCOK");
            setEmail("");
            setAmount("");
            setSenderAcc("");
        }
        else if(response.status === 400)
        {
            setResult("Invalid ACcount");
        }
        else if(response.status === 409)
        {
            setResult("Insufficient money");
        }
        else if(response.status == 403)
        {
            setResult("Self Transfer Restrictied");
        }
    }

    return(
        <>
        <div className="sender-wrapper">
        <div className="back-btn"><Link to={"/dashboard"}>back</Link></div>
        <h2>Receiver Name</h2>
        <input type="text" className="input-box" placeholder="Receiver Name" value={email} onChange={(e) => {setEmail(e.target.value); sessionStorage.setItem("EMACOOKIE", e.target.value);}} required/>
        <h2>Sender Account No</h2>
        <input type="text" className="input-box" placeholder="Sender Account No" value={senderAcc} onChange={(e) => {setSenderAcc(e.target.value); sessionStorage.setItem("NOCOOKIE", e.target.value);}} required/>
        <h2>Amount</h2>
        <input type="text" className="input-box" placeholder="Amount" value={amount} onChange={(e) => {setAmount(e.target.value); sessionStorage.setItem("AMCOK", e.target.value);}} required/>
        {result === "Invalid ACcount" && 
            <div><p style={{color:"red"}}>Invalid Account</p></div>
        }

        {result === "Insufficient money" && 
            <div><p style={{color:"red"}}> Insufficient Money</p></div>
        }

        {result === "Self Transfer Restrictied" && 
            <div><p style={{color:"red"}}> Self Transfer Restrictied</p></div>
        }

        {result === "successful" &&
            <div><p style={{color:"red"}}> transfer successful</p></div>
        }

        <div className="submit-btn"><span onClick={handleSubmit}>submit</span></div>
        </div>
        </>
    );
}

export default Sender;