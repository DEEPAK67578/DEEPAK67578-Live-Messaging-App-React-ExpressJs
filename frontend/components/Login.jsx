import React from 'react'
import { Form,useActionData } from 'react-router-dom'
import classes from './Login.module.css'
function Login() { //Login Component For the Route /login
  const err = useActionData()
  return (
   <>
     {err && <p className={classes.err}>{err}</p>}
      <div className={classes.wrapper}>
      <Form method='POST' className={classes.form}>
        <h3>Login</h3>
        <label>Email</label>
        <input id='mail' name='email'></input>
        <label>Password</label>
        <input id='password' name='password'></input>
        <button>Submit</button>
      </Form>
    </div>
   </>
  )
}

export default Login
