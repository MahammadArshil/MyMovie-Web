import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();


    function handleLogin(e) {
        e.preventDefault();
        axios
            .post('http://localhost:1122/api/login', { email, password })
            .then((res) => {
                if (res.status == 200) {
                    let role = res.data.user.role;
                    let name = res.data.user.name;
                    login(role,name);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("role", role);
                    localStorage.setItem("name", name);
                    if(role == 'user'){
                        navigate("/Home");
                    }
                    else{
                        navigate("/adminDashboard");
                    }
                }
            });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={handleLogin}
                className="border shadow p-6 w-full max-w-sm bg-white rounded-xl">
                <div>
                    <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Login</h2>
                    <TextField fullWidth required margin='normal' id="outlined-basic"
                        value={email} onChange={(e) => { setEmail(e.target.value) }}
                        label="Email" variant="outlined" />
                    <TextField fullWidth required margin='normal' id="outlined-password-input"
                        value={password} onChange={(e) => { setPassword(e.target.value) }}
                        label="Password" type="password" autoComplete="current-password" />
                </div>
                <div className='flex justify-center items-center mt-4'>
                    <Button type='submit' className='w-[39%] text-2xl' variant="contained" size="medium">Login</Button>
                </div>
                <p className="text-end mt-2 text-blue-700 hover:underline hover:text-blue-500">
                    <Link to={'/SignUp'}> Don&apos;t Have Account? SignUp</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
