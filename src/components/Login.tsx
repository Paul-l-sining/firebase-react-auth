import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toastError } from './Toastify';
import GoogleButton from 'react-google-button';

function Login() {
 
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { login, googleSignIn, currentUser } = useAuth();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current?.value, passwordRef.current?.value); 
            navigate('/');
        } catch (e:any) {
            setError(e.message);
        }
        setLoading(false);
    }

    const handleGoogleSignIn = async (e:React.FormEvent) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await googleSignIn();
            navigate('/');
        } catch (e:any) {
            setError(e.message);
        }   
        setLoading(false);
    }


    useEffect(() => {
        currentUser && <>{navigate("/")}</> 
    })


    if (error) toastError(error)

    return (
    <> 
       <Card>
        <Card.Body>
            <h2 className="text-center my-4">Log In</h2>
            <Form onSubmit={handleSubmit}>
            {error && <Alert variant='danger'>{error}</Alert>}
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
            <div className="w-100 text-center">
                <Link className='no_underline' to='/forget-password'>Forget Password?</Link> 
            </div>
            <div className='d-flex align-items-center justify-content-center my-3'>
                <GoogleButton onClick={handleGoogleSignIn} />
            </div>
        </Card.Body>
       </Card>
       <div className="w-100 text-center mt-2">
            Need an account? <Link className='no_underline' to='/signup'>Sign Up</Link> 
       </div>
    </>
    );
}

export default Login;