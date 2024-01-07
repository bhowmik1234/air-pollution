"use client"
import {useRouter} from "next/navigation";
import axios from "axios";
import React from "react";

export default function UserProfile() {

    const router = useRouter();
    const logout = async () =>{
        try{    
            await axios.get('/api/users/logout');
            router.push('/login');
        }catch(error: any){
            console.log(error.message);
        }
    };

    return (
        <section className="profile bg-black-500 flex flex-col min-h-screen justify-center items-center">
            <h1 className="  text-3xl">it a profile section</h1>
            <button className="p-3 mt-5 bg-blue-600 rounded-md" onClick={logout}>Log Out</button>
        </section>
    );
}