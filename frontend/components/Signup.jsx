import React, { useRef } from 'react'
import classes from './Signup.module.css'
function Signup() {
  const filePickerRef = useRef()
  return (
    <div className={classes.wrapper}>
      <form className={classes.form}>
        <h3>Sign up</h3>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name'></input>
        <label htmlFor='email'>Email</label>
        <input type='email' id='mail' name='email'></input>
        <label htmlFor='description'>Description About You</label>
        <textarea rows={7} name='description' id='description'></textarea>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password'></input>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input type='password' id='password' name='confirmPassword'></input>
        <label htmlFor='file'>Upload Your Image</label>
        <div className={classes.ImgPick} onClick={()=> {
          filePickerRef.current.click()
        }}>
          <p>Upload Your Image</p>
        </div>
        <input id='file' ref={filePickerRef} style={{display:"none"}} type='file' name='file'></input>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Signup
