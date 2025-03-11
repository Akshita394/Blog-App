/*import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);
    const [isValidToken, setIsValidToken] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await axios.get("/api/auth/verifyToken", { withCredentials: true });
                setIsValidToken(res.data.success);
            } catch (error) {
                setIsValidToken(false);
            }
        };
        checkToken();
    }, []);

    if (isValidToken === null) return <p>Loading...</p>;
    
    return isValidToken && currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}*/

import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet , Navigate} from 'react-router-dom'
import axios from "axios";

export default function PrivateRoute() {
    const {currentUser} = useSelector((state) => state.user)
    /*const [isValidToken, setIsValidToken] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await axios.get("/api/auth/verifyToken", { withCredentials: true });
                setIsValidToken(res.data.success);
            } catch (error) {
                setIsValidToken(false);
            }
        };
        checkToken();
    }, []);

    if (isValidToken === null) return <p>Loading...</p>;
    return isValidToken ? <Outlet /> : <Navigate to="/sign-in" />;*/
  return currentUser ? <Outlet/> : <Navigate to='sign-in'/>
}
