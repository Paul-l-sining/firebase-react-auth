import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
 
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { login, currentUser } = useAuth();
    const [error, setError] = useState<String>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current?.value, passwordRef.current?.value); 
            navigate('/');
        } catch (error) {
            setError('Failed to sign in')
        }
        setLoading(false);
    }

    return (
    <> 
       <Card className="p-3">
        <h2 className="text-center my-4">Log In</h2>
        {currentUser?.email}
       <Form onSubmit={handleSubmit}>
        {error && <Alert variant='danger' >{error}</Alert>}
        <Form.Group id='email' className='mb-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' ref={emailRef} required ></Form.Control>
        </Form.Group>
        <Form.Group id='password' className='my-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' ref={passwordRef} required ></Form.Control>
        </Form.Group>
        <Button disabled={loading} className='w-100 my-4' type='submit'>Log In</Button>
       </Form>
       </Card>
       <div className="w-100 text-center mt-2">
            Need an account? <Link to='/signup'>Sign Up</Link> 
       </div>
    </>
    );
}

export default Login;