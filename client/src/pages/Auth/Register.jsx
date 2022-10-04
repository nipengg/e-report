import React, { useState } from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const url = 'http://127.0.0.1:3000/'

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [msg, setMsg] = useState('')

    const register = async (e) => {
        e.preventDefault()
        console.log('test register')
        try {
            await axios.post(`${url}users`, {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            })

            navigate('/login')
        } catch (error) {
            setMsg(error.response.data.message)
        }
    }

    return (
        <div className="Auth-form-container">
            <form onSubmit={register} className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>

                    {msg ?
                        <Alert variant='danger'>
                            {msg}
                        </Alert>
                    : ''}

                    <div className="form-group mt-3">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Already have an account?<a href="/login">Login</a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register