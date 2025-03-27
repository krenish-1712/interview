import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, TextField, Autocomplete, Button, Switch, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';


const User = () => {
  let token = localStorage.getItem("Token");
  const [open, setOpen] = useState(false);
  const [id, Setid] = useState(null)
  let [task, settask] = useState([])
  const label = { inputProps: { 'aria-label': 'Switch demo' } };



 

  const handleClickOpen = (index) => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };


  let getdata = async (props) => {
    try {
      let res = await axios.get("http://localhost:3000/admintask/gettask");
      settask(res.data.data);

    } catch (error) {

    }
  }
  useEffect(() => {
    getdata()
  }, [])

  return (
    <div>

    <h1>User</h1>
        
        <table width='100%' style={{ textAlign: 'center' }}>
          <thead style={{ backgroundColor: '#1976D2', height: '60px', color: 'white' }}>
            <tr>
              <td>No</td>
              <td>Task Name</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody >

            {
                task.map((e, i) => {
                  return <tr key={i} style={{ height: '70px' }} className={i % 2 === 0 ? 'rowcolor' : ""}>
                    <td>{i + 1}</td>
                    <td >{e.taskname}</td>
                    <td><Switch defaultChecked /></td>
                  </tr>
                })
            }
          </tbody>
        </table>

        <ToastContainer />
    </div>
  )
}

export default User

