import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1122/api/signup', { name, email, password });
            if (response.data.success) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={handleSignup}
                className="border shadow p-6 w-full max-w-sm bg-white rounded-xl">
                <div>
                    <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">SignUp</h2>
                    <TextField fullWidth required margin='normal' id="outlined-basic"
                        value={name} onChange={(e) => { setName(e.target.value) }}
                        label="Full Name" variant="outlined" />
                    <TextField fullWidth required margin='normal' id="outlined-basic"
                        value={email} onChange={(e) => { setEmail(e.target.value) }}
                        label="Email" variant="outlined" />
                    <TextField fullWidth required margin='normal' id="outlined-password-input"
                        value={password} onChange={(e) => { setPassword(e.target.value) }}
                        label="Password" type="password" autoComplete="current-password" />
                </div>
                <div className='flex justify-center items-center mt-4'>
                    <Button type='submit' className='w-[39%] text-2xl' variant="contained" size="medium">SignUp</Button>
                </div>
                <p className="text-end mt-2 text-blue-700 hover:underline hover:text-blue-500">
                    <Link to={'/'}> Already Have an Account? Login</Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
