import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function UpdateProfile() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const { changeEmail, changePassword, currentUser } = useAuth();
    const [error, setError] = useState<String>("");
    const [message, setMessage] = useState<String>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        if (passwordRef.current?.value !== passwordConfirmRef.current?.value )
            return setError("Passwords do not match");

    
        setError("");
        setLoading(true);
        const promises = [];
        if (emailRef.current?.value !== currentUser.email){
            promises.push(changeEmail(emailRef.current?.value));
        }
        if (passwordRef.current?.value){
            promises.push(changePassword(passwordRef.current?.value));
        }

        Promise.all(promises).then(()=>{
            navigate('/');
        }).catch((e:any)=>{
            setError(e.message);
        }).finally(()=>{
            setLoading(false);
        })

    }

    return (
    <> 
       <Card>
        <Card.Body>
            <h2 className="text-center my-4">Profile Update</h2>
            <Form onSubmit={handleSubmit}>
            {error && <Alert variant='danger' >{error}</Alert>}
            {message && <Alert variant='success' >{message}</Alert>}
            <Form.Group id='email' className='mb-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' 
                ref={emailRef} 
                placeholder={currentUser?.email} 
                defaultValue={currentUser?.email}  
                required ></Form.Control>
            </Form.Group>
            <Form.Group id='Password' className='mb-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef} placeholder="Leave blank to keep the same" ></Form.Control>
            </Form.Group>
            <Form.Group id='Password Confirmation' className='mb-2'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type='password' ref={passwordConfirmRef} placeholder="Leave blank to keep the same" ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className='w-100 my-3' type='submit'>Update</Button>
            </Form>
        </Card.Body>
       </Card>
       <div className="w-100 text-center mt-2">
           <Link to='/'>Cancel</Link> 
       </div>
    </>
    );
}

export default UpdateProfile;