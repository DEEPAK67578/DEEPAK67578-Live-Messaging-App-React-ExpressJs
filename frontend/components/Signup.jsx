import React from 'react'
import classes from './Signup.module.css'
function signup() {
  return (
    <div className={classes.wrapper}>
      <form className={classes.form}>
        <h3>Sign up</h3>
        <label>Email</label>
        <input id='mail' name='email'></input>
        <label>Password</label>
        <input id='password' name='password'></input>
        <label>Confirm Password</label>
        <input id='password' name='password'></input>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default signup
