import { useEffect, useState } from "react";



function History()
{
    const[history, setHistory] = useState([]);
    useEffect(() => {

        const run = async () => {

        const response = await fetch("http://localhost:8080/api/users/history",
            {
                method: "GET",
                headers:{
                     "Content-Type": "application/json"
                },
                credentials:"include"
            }
        );

        if(!response.ok)
        {
            throw console.error("Failed to fetch");
        }

        const data = await response.json();
        setHistory(data);
    };
    run()
    },[]);
    return(
        <>
        <h2>History</h2>

        <table>
            <thead>
                <tr>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {history.map((item, index) =>(
                    <tr key={index}>
                        <td>{item.senderAccount}</td>
                        <td>{item.receiveAccount}</td>
                        <td>{item.cash}</td>
                        <td>{item.status}</td>
                        <td>{new Date (item.timestamp).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}

export default History;