"use client"
import React, {use, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function SignUpPage () {

        const router = useRouter();
        const[user, setUser] = React.useState({
            username:"",
            email:"",
            password:"",
        })
    
        const [buttonDisable, setButtonDisable] = React.useState(false);
        const [loading, setLoading] = React.useState(false);


        // on click sign up button
        const onSignUp = async () =>{
            try{
                setLoading(true);
                const response = await axios.post("/api/users/signup", user);
                console.log("response ddata: ", response);

                router.push('/login');

            }catch(error: any){
                console.log(error.message);
            }finally{
                setLoading(false);
            }
    
        }

        useEffect(() =>{
            if(user.username.length > 0 && user.password.length > 0 && user.email.length > 0)
            {
                setButtonDisable(false);
            }
            else
            {
                setButtonDisable(true);
            }
        }, [user]);

        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl">{loading? "Proceessing": "Sign UP"}</h1>
            <hr />
            <label className="text-2xl" htmlFor="username">User Name : </label>
            <input 
                className="p-4 rounded-lg borger-gray-300 focus:outline-none focus:outline-gray-300 text-black"
                id="username"
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({...user, username:e.target.value})}
            />
            <label className="text-2xl" htmlFor="username">Email : </label>
            <input 
                className="p-4 rounded-lg borger-gray-300 focus:outline-none focus:outline-gray-300 text-black"
                id="email"
                type="text"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({...user, email:e.target.value})}
            />
            <label className="text-2xl" htmlFor="password">password : </label>
            <input 
                className="p-4 border-none rounded-lg borger-gray-300 focus:outline-none focus:outline-gray-300 text-black"
                id="password"
                type="text"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({...user, password:e.target.value})}
            /> 
            <button onClick={onSignUp} className="bg-blue-600 px-10 py-3 rounded-lg">{buttonDisable ? "No sign up": "Sign Up"}</button> 
            <Link href="/login"> go to Login page</Link>
            </div>
        );
    
}