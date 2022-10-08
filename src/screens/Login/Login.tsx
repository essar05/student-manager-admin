import React, { Component, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, CustomInput } from 'reactstrap'
import { useStore } from '../../shared/hooks/useStore'

export interface LoginProps {}

export const Login = (props: LoginProps) => {
  const [hasLoginError, setLoginError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = useStore(state => state.login)

  const handleLogin = useCallback(async () => {
    setLoginError(false)

    const token = await login(username, password)

    if (token) {
      localStorage.setItem('auth-token', token)
    } else {
      setLoginError(true)
    }
  }, [login, password, username])

  return (
    <div className="block-center mt-4 wd-xl">
      <div className="card card-flat">
        <div className="card-header text-center bg-dark">
          <a href="">
            <img className="block-center rounded" src="img/logo.png" alt="Logo" />
          </a>
        </div>
        <div className="card-body">
          <p className="text-center py-2">SIGN IN TO CONTINUE.</p>

          {hasLoginError && <p className="text-center text-danger">Username or password invalid</p>}

          <form className="mb-3" name="formLogin">
            <div className="form-group">
              <div className="input-group with-focus">
                <Input
                  type="text"
                  name="username"
                  className="border-right-0"
                  placeholder="Enter username"
                  onChange={event => {
                    setUsername(event.target.value)
                  }}
                  data-validate='["required"]'
                  value={username}
                />
                <div className="input-group-append">
                  <span className="input-group-text text-muted bg-transparent border-left-0">
                    <em className="fa fa-user"></em>
                  </span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group with-focus">
                <Input
                  type="password"
                  id="id-password"
                  name="password"
                  className="border-right-0"
                  placeholder="Password"
                  onChange={event => {
                    setPassword(event.target.value)
                  }}
                  data-validate='["required"]'
                  value={password}
                />
                <div className="input-group-append">
                  <span className="input-group-text text-muted bg-transparent border-left-0">
                    <em className="fa fa-lock"></em>
                  </span>
                </div>
                <span className="invalid-feedback">Field is required</span>
              </div>
            </div>
            <button className="btn btn-block btn-primary mt-3" type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="p-3 text-center">
        <span className="mr-2">&copy;</span>
        <span>2022</span>
        <span className="mx-2">-</span>
        <span>Essar</span>
      </div>
    </div>
  )
}
