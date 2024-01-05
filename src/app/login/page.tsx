"use client"
import React from "react";
import Link from "next/link";
// import (useRouter) from "next/navigation";
// import {axios} from "axios";

export default function Login(){
    const[user, setUser] = React.useState({
        email:"",
        password:"",
    })

    const onLogin = async () =>{

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl">Login</h1>
        <hr />
        <label className="text-2xl" htmlFor="username">Email : </label>
        <input 
            className="p-4 rounded-lg borger-gray-300 focus:outline-none focus:outline-gray-300"
            id="email"
            type="text"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({...user, email:e.target.value})}
        />
        <label className="text-2xl" htmlFor="password">password : </label>
        <input 
            className="p-4 rounded-lg borger-gray-300 focus:outline-none focus:outline-gray-300"
            id="password"
            type="text"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({...user, password:e.target.value})}
        /> 
        <button onClick={onLogin}  className="bg-blue-600 px-10 py-3 rounded-lg">Login</button> 
        <Link href="/signup"> Sign up page</Link>
        </div>
    );
}
