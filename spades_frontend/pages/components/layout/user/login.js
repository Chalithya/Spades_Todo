import { Avatar, Button, Grid, Paper, TextField, FormControlLabel, Checkbox, Typography, Link } from '@material-ui/core';
import { bottomNavigationClasses } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from "react";




const Login = () => {

    const paperStyle = { backgroundColor: '#f2f2f2', padding: 20, height: '70vh', width: '400px', margin: '20px auto', }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnStyle = {margin:'8px 0'}

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = "http://localhost:8080/api/login";
            const {data: res} = await axios.post(url, data);
            localStorage.setItem('token', res.data);
            window.location = '/';
            console.log(res.message);
            alert(res.message);
        }
        catch (error){
            if(
                error.response &&
                error.response.status >= 400 &&
                error.response.status <=500
            ){
                setError(error.response.data.message);
            }
        }
    }

  async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:8000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/dashboard'
		} else {
			alert('Please check your username and password')
		}
	}





    return (
        <><form onSubmit={loginUser}>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}></Avatar>
                        <h2>Sign In</h2>

                        <TextField 
                        value={data.email}
                        onChange={handleChange}
                        label='Email' 
                        placeholder='Enter Email' 
                        fullWidth required 
                        />
                        <TextField 
                        value={data.password}
                        onChange={handleChange}
                        onChange={(e) => setPassword(e.target.value)}
                        label='Password' 
                        placeholder='Enter User Password' 
                        type='password' 
                        fullWidth required 
                        />

                    </Grid>
                    <FormControlLabel
                        control={<Checkbox
                            name='checkboxA'
                            color='secondary'
                            defaultChecked />} label='Remember Me'
                    />
                    <Button variant='contained' style={btnStyle} color='secondary' fullWidth type='submit'>  Login </Button>

                    <Typography>
                        <Link href='#'>Forgot password ?</Link>
                    </Typography>

                    <Typography>
                        Do you have an account ?
                        <Link href='#'>Signup</Link>
                    </Typography>


                </Paper>
            </Grid>
            </form>
        </>
    )
}

export default Login

