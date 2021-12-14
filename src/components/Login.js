import React, { useState } from 'react'

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = response.json;
        console.log(json);
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
       <div>
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal ">Please Log in</h1>

                <div className="form-floating  ">
                    <input type="email" className="form-control"onChange={onChange} name='email' value={credentials.email} id="email" placeholder="name@example.com" />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating  ">
                    <input type="password" name='password' onChange={onChange} className="form-control" value={credentials.password} id="passowrd" placeholder="Password" />
                    <label htmlFor="password">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary " type="submit" >Sign in</button>
                <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
            </form>
        </div>
    )
}
