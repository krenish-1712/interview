import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';





const Login = () => {
  let navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      // Check if fields are empty BEFORE sending request
      if (!values.email || !values.password) {
        toast.warning("Please enter all fields!");
        return; 
      }

    try {
        let [userResponse, adminResponse] = await Promise.allSettled([
          axios.post("https://interviewbackend-5cb7.onrender.com/users/login",values),
          axios.post("https://interviewbackend-5cb7.onrender.com/admin/login",values),
        ]);
      
        if (userResponse.status === "fulfilled" && userResponse.value.status === 200) {
          toast.success("User login successful! Redirecting...");
          setTimeout(() => navigate("/user"), 2000);
          return;
        }
      
        if (adminResponse.status === "fulfilled" && adminResponse.value.status === 200) {
          toast.success("Admin login successful! Redirecting...");
          setTimeout(() => navigate("/admin"), 2000);
          return;
        }
      
        toast.error("User or password is invalid");
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
      
    },
  });
  

  let signup = () =>{
    navigate('/signupuser')
  }

  return (
  
    <div style={{ width: '100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
   
      <Box 
        sx={{width: '500px',display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center' ,height: 'fit-content',padding:'50px 10px',border: '2px solid #1976d2',borderRadius:'25px',boxShadow:'0 0 5px #1976d2'}}>
        <Typography sx={{ fontSize: '30px',color:'black',fontWeight:'600' }} >
          Log in
        </Typography>
        <br />
        <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{ '& > :not(style)': { m: 1, width: '400px'},display:'flex' , flexDirection:'column',alignItems:'center',justifyContent:'center' }}
          noValidate
          autoComplete="off"
        >
            <TextField
              id="outlined-basic"
              name="email"
              label="Email"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.email}
              
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type='password'
              name='password'
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.password}
               
            />
             <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Agree to terms and conditions"
              
            />
          <p className='fs-6 text-white'>Don't have an account?<button onClick={()=>signup()} type='button' style={{backgroundColor:'transparent', border:'none',color:'blue'}}>Sign up</button></p>
        <Button variant="contained" sx={{ width: '400px' }} type="submit">Log in</Button>
        </Box>
      </form>
    </Box>
     <ToastContainer />
    </div >
  
  )
}
export default Login
