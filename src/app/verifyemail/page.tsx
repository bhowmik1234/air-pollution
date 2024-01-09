"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link"




export default function verifyEmial() {

    const [token, setToken] = useState("");
    const [verify, setVerify] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            await axios.post('/api/users/verifyEmail', { token });
            setVerify(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const url = window.location.search.split("=")[1];
        setToken(url || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail();
        }
    }, [token]);
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <h1 className="bg-cyan-700 p-3 rounded">verify email</h1>
            <h2 className="p-3 bg-orange-500 rounded">{token === "" ? "" : `${token}`}</h2>

            {verify && (
                <div>
                    <h1 className="bg-green-600 text-black p-3 rounded">email verified</h1>
                    <Link href="/login">go to Login page</Link>
                </div>
            )}

            {error && (
                <div>
                    <h1 className="bg-red-700 text-black p-3 rounded">email Not verified</h1>
                </div>
            )}


        </div>

    );
}