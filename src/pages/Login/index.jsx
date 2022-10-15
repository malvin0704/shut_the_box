import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import '../../sass/index.scss'
import logo from '../../images/logo.png'
import { ToastContainer, toast } from 'react-toastify'
export default function Login() {
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (handleValidation()) {
      const { username, password } = values
      try {
        setError('')
        const { data } = await axios.post(
          'http://localhost:3000/login',
          {
            username,
            password,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
          }
        )
        navigate('/game')
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setError(err.response.data)
        }
      }
    }
  }
  const toastOption = {
    position: 'bottom-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }
  const handleValidation = () => {
    const { username } = values
    let a = username.charCodeAt(0)
    if (username.length > 41 || username.length < 5) {
      toast.error('Username should be between 5 and 41 characters', toastOption)
      return false
    } else if (a < 48 || (a > 57 && a < 65) || (a > 90 && a < 97) || a > 122) {
      toast.error(
        'Username should start with alphanumeric characters.',
        toastOption
      )
      return false
    }
    return true
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const [error, setError] = useState('')
  const [values, setValues] = useState({
    username: '',
    password: '',
  })
  return (
    <div id='container'>
      <div id='img-wrap'>
        <img src={logo} alt='' />
      </div>
      <div id='container-wrap'>
        <h1>Shut the Box</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            id='username'
            name='username'
            onChange={handleChange}
            placeholder='please enter a username'
            required
          />
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            id='password'
            name='password'
            onChange={handleChange}
            placeholder='please enter a password'
            required
          />
          <span>{error}</span>
          <p>
            Need an accout? <Link to='/register'>Create an account</Link>
          </p>
          <button type='submit'> Login </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}
