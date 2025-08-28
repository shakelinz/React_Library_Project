import React from 'react'
import {
  Button, Form, TextField
} from "@mui/material";

export const UserProfilePage = () => {
  return (
    <div>
      <h1>User Profile Page</h1>
      <Form>
        <TextField label="username" variant="outlined" fullWidth margin="normal" />
        <TextField label="email" variant="outlined" fullWidth margin="normal" />
        <Button variant="contained" color="primary" type="submit">Save Changes</Button>
      </Form>
    </div>
  )
}

