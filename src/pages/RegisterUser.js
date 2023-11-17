import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import './RegisterUser.css'

export default function RegisterUser() {

    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {


            const reqBody = JSON.stringify({
                displayName, email, number, password
            })


            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: reqBody
            })

            const data = await res.json();
            console.log(data);

            if (res.status == 422 || !data) {
                window.alert(data.error);
                console.log("Invalid Registration");
            } else {
                window.alert(data.message);
                navigate("/signin")
            }
        } else {
            alert("Password and confirm password are not same")
        }
    }

    return (
        <div className="signup-container">
            <div className="inputs-section">
                <h2>Create your account</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" className="signup-inputs" placeholder="Name" onChange={(e) => { setDisplayName(e.target.value) }} value={displayName} />
                    <input type="email" className="signup-inputs" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    <input type="string" className="signup-inputs" placeholder="Phone Number" onChange={(e) => { setNumber(e.target.value) }} value={number} />
                    <input type="password" className="signup-inputs" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                    <input type="password" className="signup-inputs" placeholder="Confirm Password" onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} />
                    <div className="signup-inputs-btn-container">
                        <button type="submit" className="signup-inputs-btn">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}