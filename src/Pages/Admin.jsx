import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, TextField, Autocomplete, Button, Switch, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';


const Admin = () => {
  let token = localStorage.getItem("Token");
  const [open, setOpen] = useState(false);
  const [id, Setid] = useState(null)
  let [task, settask] = useState([])
  const label = { inputProps: { 'aria-label': 'Switch demo' } };



  const formik = useFormik({
    initialValues: {
      taskname: '',
    },
    onSubmit: async (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      let res;
      
        try {
          res = await axios.post("http://localhost:3000/admintask/createtask", { taskname: values.taskname });

        } catch (error) {

        }
      
      resetForm();
      getdata();
      handleClose();
      toast.success(res.data.message)
    },
  });


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

        <Box sx={{ width: '100%', display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <h1>Admin</h1>
          <Button onClick={() => handleClickOpen()} style={{ backgroundColor: '#1976D2', color: 'white', width: '15%' }}>
            Add Task
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}

          >
            <DialogTitle>Add Task</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
              <DialogContent dividers>


                <TextField
                  id="outlined-basic"
                  label="Task"
                  variant="outlined"
                  autoFocus
                  required
                  margin="dense"
                  type="text"
                  name="taskname"
                  onChange={formik.handleChange}
                  value={formik.values.taskname}
                />
                <DialogActions>
                  <Button type="submit" onSubmit={onsubmit} style={{ backgroundColor: '#1976D2', color: 'white' }} className='px-3'>Submit</Button>
                </DialogActions>
              </DialogContent>
            </form>
          </Dialog>
        </Box>

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

export default Admin
