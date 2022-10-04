import React, { useState } from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom'
import "./style.css"

const Login = () => {

    const url = 'http://127.0.0.1:3000/'

    const navigate = useNavigate()
    const [email, setEmail] = useState('example@example.com')
    const [password, setPassword] = useState('12345678')
    const [msg, setMsg] = useState('')

    const login = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${url}users/login`, {
                email: email,
                password: password,
            })

            navigate('/')
        } catch (error) {
            setMsg(error.response.data.message)
        }
    }

    return (
        <div className="Auth-form-container">
            <form onSubmit={ login } className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>

                    {msg ?
                        <Alert variant='danger'>
                            {msg}
                        </Alert>
                    : ''}

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
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Didn't have an account?<a href="/register">Register</a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login