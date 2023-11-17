import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import './LandingPage.css'

export default function LandingPage() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>DocUp</h1>
            <div>
                <button onClick={() => navigate('/signin')}>User</button>
                <button onClick={() => navigate('/admin')}>Admin</button>
            </div>
        </div>
    )
}