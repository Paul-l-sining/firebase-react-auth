import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        
        <div className="w-100 text-center mt-2">
            <h1>404 Not Found</h1>
            <Link className='no_underline btn btn-primary w-50 mt-3' to='/'>Back</Link> 
        </div>
        
    );
}

export default NotFound;