'use client'
import { useRouter } from 'next/navigation';
import {useState} from 'react';

export default function Sign_up() {

    const router = useRouter();

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
        try {
            
            const formData = {
                username: e.target.username.value,
                useremail: e.target.useremail.value,
                useryear: e.target.useryear.value,
                password: e.target.password.value,
            };
    
            const response = await fetch('../api/user/register', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                }
            );
    
            const result = await response.json();
            console.log(result.message)
            if (result.message === "User created") {
                console.log("test")
                router.push("/signin")
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form method="POST" onSubmit={handleSubmit}>
                <input id='username' required name='username' onChange={handleInput} value={formData.username} placeholder='Enter your name'/>
                <input id='password' required name='password' onChange={handleInput} value={formData.password} placeholder='Enter your password'/>
                <input id='useremail' required name='useremail' onChange={handleInput} value={formData.useremail} placeholder='Enter your email'/>
                <input id='useryear' required name='useryear' onChange={handleInput} value={formData.useryear} placeholder='Enter your year'/>
                <button type='submit'>submit</button>
            </form>                 
        </>
        
    )
}