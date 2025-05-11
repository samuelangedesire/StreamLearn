'use client'
import {useState} from 'react';

export default function Sign_up() {

    const [formData, setFormData] = useState(
        {username: "", password: "", useryear:"", useremail:""}
    )

    const handleInput = (e) => {
        const fieldname = e.target.name;
        const fieldvalue = e.target.value;

        setFormData((prevState) => (
            {
                ...prevState,
                [fieldname]: fieldvalue
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            useremail: e.target.useremail.value,
            password: e.target.password.value,
        };

        const response = await fetch('../api/user/login', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            }
        );

        const result = await response.json();
        console.log(result);
    }

    return (
        <>
            <form method="POST" onSubmit={handleSubmit}>
                <input id='useremail' required name='useremail' onChange={handleInput} value={formData.useremail} placeholder='Enter your email'/>
                <input id='password' required name='password' onChange={handleInput} value={formData.password} placeholder='Enter your password'/>
                <button type='submit'>submit</button>
            </form>                 
        </>
        
    )
}