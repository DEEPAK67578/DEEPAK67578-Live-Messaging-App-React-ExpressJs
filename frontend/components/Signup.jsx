import React, { useRef, useState } from 'react'
import {Form} from 'react-router-dom'
import { useActionData } from 'react-router-dom'
import classes from './Signup.module.css'
function Signup() {
  const actionData = useActionData()
  console.log(actionData)
  const filePickerRef = useRef()
  const [preview,setPreview] = useState(null)
  return (
    <div className={classes.wrapper}>
      {actionData ? <p className={classes.err}>{actionData}</p> : ""}
      <Form encType='multipart/form-data' method='POST' className={classes.form}>
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
        <input type='password' id='confirmPassword' name='confirmPassword'></input>
        <label htmlFor='file'>Upload Your Image</label>
        <div className={classes.ImgPick} onClick={()=> {
          filePickerRef.current.click()
        }}>
          {!preview && <p>Upload Your Image</p>}
          {preview && <img src={preview} alt="" />}
        </div>
        <input onChange={(eve)=> {
          const fileSource = URL.createObjectURL(eve.target.files[0])
          console.log(fileSource)
          setPreview(fileSource)
        }} id='file' ref={filePickerRef} style={{display:"none"}} type='file' name='file'></input>
        <button>Submit</button>
      </Form>
    </div>
  )
}

export default Signup
