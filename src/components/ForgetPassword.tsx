import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { toastError, toastSuccess } from './Toastify';

function ForgetPassword() {

    const emailRef = useRef<HTMLInputElement>(null);
    const { resetPassword, currentUser } = useAuth();
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            setMessage("");
            await resetPassword(emailRef.current?.value);
            setMessage("Check your inbox for further instructions");
        } catch (e:any) {
            setError(e.message);
        }
        setLoading(false);  

    }

    if (error) toastError(error);
    if (message) toastSuccess(message);

    return (
    <> 
       <Card>
        <Card.Body>
            <h2 className="text-center my-4">Password Reset</h2>
            <Form onSubmit={handleSubmit}>
            {error && <Alert variant='danger' >{error}</Alert>}
            {message && <Alert variant='success' >{message}</Alert>}
            <Form.Group id='email' className='mb-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className='w-100 my-4' type='submit'>Reset Password</Button>
            </Form>
            <div className="w-100 text-center mb-2">
            <Link className='no_underline' to='/login'>Login</Link> 
            </div>
        </Card.Body>
       </Card>
       <div className="w-100 text-center mt-2">
            Need an account? <Link className='no_underline' to='/signup'>Sign Up</Link> 
       </div>
    </>
    );
}

export default ForgetPassword;