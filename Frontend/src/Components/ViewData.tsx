import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './ViewData.css'

interface Timelog {
    id: number;
    firstname: string;
    jobname: string;
    workdate: string;
    hours: number;
    status: string;
}

const ViewData: React.FC = () => {
    const [timelog, setTimelog] = useState<Timelog[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/job/viewdata");
                setTimelog(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        fetchData()
    }, [])

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/job/timelog/${id}`);
            setTimelog(timelog.filter((log) => log.id !== id));
        } catch (error) {
            console.error("Error deleting data", error);
        }
    };


    return (
        <div className="container">
            <h1>Zoho TimeLogs</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Job Name</th>
                        <th>Work Date</th>
                        <th>Hours</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {timelog.map((log) => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.firstname}</td>
                            <td>{log.jobname}</td>
                            <td>{log.workdate}</td>
                            <td>{log.hours}</td>
                            <td>{log.status}</td>
                            <td><button onClick={() => navigate(`/edit/${log.id}`)} >Edit</button></td>

                            <td><button onClick={()=>handleDelete(log.id)} >Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewData
