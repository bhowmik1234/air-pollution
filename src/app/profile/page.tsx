"use client"
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link"

export default function UserProfile() {

    const router = useRouter();
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [id, setId] = React.useState("");

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const userDetails = async () => {
        const user = await axios.get('/api/users/me');
        console.log(user);
        setId(user.data.data._id);
        setUsername(user.data.data.username);
        setEmail(user.data.data.email);
    };

    useEffect(() =>{
        userDetails();
    }, []);

    return (


        <main className='flex flex-col'>
            {/* navbar */}
            <nav className='flex p-5 h-20 justify-between'>
                <Link href='/' className='text-4xl'>Logo</Link>
                <div className='flex gap-10'>
                    <Link href='/' className='text-lg m-auto'>Home</Link>
                    <Link href='/profile' className='text-lg m-auto'>Profile</Link>
                    <button className='p-2 rounded border hover:bg-fuchsia-700' onClick={logout}>Logout</button>
                </div>
            </nav>
            <hr />
            <section className="bg-black-500 pt-36 flex items-center justify-center flex-col">
                <h1 className=" mb-5 text-4xl font-mono">User Profile</h1>
                <div className="bg-zinc-800 rounded-lg p-7">
                    <h2 className="p-3 bg-green-500 rounded"> {id === 'nothing' ? "Nothing" : <Link href={`/profile/${id}`}>{id}</Link>}</h2>
                    <h2 className="text-xl text-stone-300 font-sans my-2">Username: {username}</h2>
                    <h2 className="text-xl text-stone-300 font-sans">Email : {email}gmail.com</h2>
                </div>
            </section>
        </main>
    );
}