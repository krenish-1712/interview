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
import { VpnLockSharp } from '@mui/icons-material';


const SignUpUser = () => {
  let navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name:'',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      if (!values.email || !values.password || !values.name) {
        toast.warning("Please fill all the fields!");
        return;
      }
    
      try {
        let res = await axios.post("http://localhost:5000/admin/signup",values);
        
        toast.success("Sign up successfully!");
    
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        toast.error("Signup failed! Please try again.");
        console.error(error);
      }
    }    
});

  let login = () =>{
    navigate('/login')
  }

  return (
  
    <div style={{ width: '100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}} class='d-flex align-items-center justify-content-center'>
    
      <Box className='d-flex flex-column align-items-center justify-content-evenly' 
        sx={{width: '500px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center', height: 'fit-content',padding:'50px 10px',border: '2px solid #1976d2',borderRadius:'25px',boxShadow:'0 0 5px #1976d2'}}>
        <Typography sx={{ fontSize: '30px',color:'black',textAlign:'center',fontWeight:'600' }} >
          Sign up
        </Typography>
        <br />
        <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{ '& > :not(style)': { m: 1, width: '400px'},display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
          noValidate
          autoComplete="off"
        >
             <TextField
              id="outlined-basic"
              name="name"
              label="Name"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.name}
             
            /> 
         
            <TextField
              id="outlined-basic"
              type='email'
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
              control={<Checkbox value="remember" color="primary"  />}
              label="Agree to terms and conditions"
           
              
            />
          <p className='fs-6 text-white'>Have an account?<button onClick={()=>login()} type='button'  style={{backgroundColor:'transparent', border:'none',color:'blue'}}>Log in</button></p>
        <Button variant="contained" sx={{ width: '400px' }} type="submit">Sign up</Button>
        </Box>
      </form>
    </Box>
     <ToastContainer />
    </div >
  
  )
}
export default SignUpUser
