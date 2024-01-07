"use client"
import {useRouter} from "next/navigation";
import axios from "axios";
import React, {useState} from "react";
import Link from "next/link"

export default function UserProfile() {

    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () =>{
        try{    
            await axios.get('/api/users/logout');
            router.push('/login');
        }catch(error: any){
            console.log(error.message);
        }
    };

    const userDetails = async () =>{
        const user = await axios.get('/api/users/me');
        console.log(user);
        setData(user.data.data._id);
    };

    return (
        <section className="profile bg-black-500 flex flex-col min-h-screen justify-center items-center">
            <h1 className="  text-3xl">it a profile section</h1>
            <h2 className="p-3 bg-green-500 rounded"> {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button className="p-3 mt-5 bg-blue-600 rounded-md" onClick={logout}>Log Out</button>
            <button className="p-3 mt-5 bg-purple-800 rounded-md" onClick={userDetails}>user Details</button>
        </section>
    );
}