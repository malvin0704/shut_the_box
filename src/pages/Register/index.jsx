import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import '../../sass/index.scss'
import logo from '../../images/logo.png'
export default function Login() {
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (handleValidation()) {
      const { username, password } = values
      try {
        setError('')
        const { data } = await axios.post(
          'http://localhost:3000/register',
          {
            username,
            password,
            score: -1,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        navigate('/login')
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setError(err.response.data)
        }
      }
    }
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const toastOption = {
    position: 'bottom-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }
  const handleValidation = () => {
    const { username, password, confirmPassword } = values
    let a = username.charCodeAt(0)
    if (password !== confirmPassword) {
      toast.error('password and confirm password should be same.', toastOption)
      return false
    } else if (username.length > 41 || username.length < 5) {
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
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  useEffect(() => {}, [error])
  return (
    <div id='container'>
      <div id='container-wrap'>
        <h1>
          <img src={logo} alt='' />
          Shut the Box
        </h1>
        <h3>Create Account:</h3>
        <form method='POST' onSubmit={handleSubmit}>
          <div className='input-wrap'>
            <input
              type='text'
              id='username'
              name='username'
              onChange={handleChange}
              placeholder='please enter a username'
              required
            />
            <span>{error}</span>
          </div>
          <div className='input-wrap'>
            <input
              type='password'
              id='password'
              name='password'
              onChange={handleChange}
              placeholder='please enter a password'
              required
            />
          </div>
          <div className='input-wrap'>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              onChange={handleChange}
              placeholder='please confirm your password'
              required
            />
          </div>
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
          <button type='submit' onClick={handleSubmit}>
            Create an account
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}
