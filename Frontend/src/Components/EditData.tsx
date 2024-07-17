import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EditData.css"; 
import { useNavigate } from "react-router-dom";

interface Timelog {
    id: number;
    name: string;
    jobname: string;
    workdate: string;
    hours: number;
    status: string;
}

interface EditDataProps {
    id: number;
}

const EditData: React.FC<EditDataProps> = ({ id }) => {
    const [timelog, setTimelog] = useState<Timelog[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Timelog>>({});
    const navigate = useNavigate()
    useEffect(() => {
        // Simulating data fetch
        const fetchTimelog = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/job/timelog/${id}`);
                setTimelog(response.data);
            } catch (error) {
                console.error("Error fetching timelog", error);
            }
        };
        fetchTimelog();
    }, [id]);

    useEffect(() => {
        setEditingId(id);
        const log = timelog.find((log) => log.id === id);
        setFormData(log || {});
    }, [id, timelog]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (editingId !== null) {
                await axios.put(`http://localhost:3000/job/timelog/${editingId}`, formData);
                setTimelog(timelog.map((log) => (log.id === editingId ? { ...log, ...formData } : log)));
                setEditingId(null);
                setFormData({});
                navigate("/");
            }
        } catch (error) {
            console.error("Error updating data", error);
        }
    };

    return (
        <div className="edit-container">
            {editingId !== null && (
                <form onSubmit={handleSubmit}>
                    <h2>Edit Timelog</h2>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Job Name:
                        <input
                            type="text"
                            name="jobname"
                            value={formData.jobname || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Work Date:
                        <input
                            type="text"
                            name="workdate"
                            value={formData.workdate || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Hours:
                        <input
                            type="number"
                            name="hours"
                            value={formData.hours || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Status:
                        <input
                            type="text"
                            name="status"
                            value={formData.status || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => navigate('/')}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default EditData;
