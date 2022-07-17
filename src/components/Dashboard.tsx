import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate,  } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {

    const [error, setError] = useState<String>("");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setError("");

        try {
            await logout();
            navigate("/login");
        } catch (e:any) {
            setError(e.message);
        }
    }

    return (
        <>
            <Card className="p-3">
            <h2 className="text-center my-4">Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <span className='mb-3'><strong>Email:</strong>{currentUser?.email}</span>
            {!currentUser.emailVerified ? 
            <Link to="/update-profile" className='btn btn-primary my-2 no_underline'>Update</Link> : 
            <span className='mb-3'><strong>Name:</strong>{currentUser?.displayName}</span>}
            </Card>
            <div className="w-100 text-center mt-2">
                <Button className='no_underline' variant='link' onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    );
}

export default Dashboard;