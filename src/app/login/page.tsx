"use client"
import React, {useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function Login(){

    const router = useRouter();
    const[user, setUser] = React.useState({
        email:"",
        password:"",
    })

    const [buttonDisable, setButtonDisable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () =>{
        try{
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log("response data", response);

            router.push('/profile');

        }catch(error:any){
            console.log(error.message);
        }finally{
            setLoading(false);
        }

    };

    useEffect(() =>{
        if(user.email.length > 0 && user.password.length > 0)
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
        <h1 className="text-3xl">{loading? "precessing": "Login"}</h1>
        <hr />
        <label className="text-2xl" htmlFor="email">Email : </label>
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
            className="p-4 rounded-lg borger-gray-300 focus:outline-none focus:outline-gray-300 text-black"
            id="password"
            type="text"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({...user, password:e.target.value})}
        /> 
        <button onClick={onLogin}  className="bg-blue-600 px-10 py-3 rounded-lg">{buttonDisable?"No Login": "Login"}</button> 
        <Link href="/signup"> Sign up page</Link>
        </div>
    );
}
