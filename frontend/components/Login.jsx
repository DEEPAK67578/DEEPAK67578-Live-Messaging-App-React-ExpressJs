import React from 'react'
import classes from './Login.module.css'
function Login() { //Login Component For the Route /login
  return (
    <div className={classes.wrapper}>
      <form className={classes.form}>
        <h3>Login</h3>
        <label>Email</label>
        <input id='mail' name='email'></input>
        <label>Password</label>
        <input id='password' name='password'></input>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login
