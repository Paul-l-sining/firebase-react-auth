import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Signup(){
    
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState<String>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        if (passwordRef.current?.value !== passwordConfirmRef.current?.value )
            return setError("Passwords do not match");

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current?.value, passwordRef.current?.value); 
            navigate('/login')
        } catch (error) {
            setError('Failed to create an account')
        }
        setLoading(false);
    }

    return (
    <> 
       <Card className="p-3">
        <h2 className="text-center my-4">Sign Up</h2>
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
        <Form.Group id='password-confirm' className='mt-2'>
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type='password' ref={passwordConfirmRef} required ></Form.Control>
        </Form.Group>
        <Button disabled={loading} className='w-100 my-4' type='submit'>Sign Up</Button>
       </Form>
       </Card>
       <div className="w-100 text-center mt-2">
            Already have an account? <Link to='/login'>Log In</Link> 
       </div>
    </>
    );
}

export default Signup;