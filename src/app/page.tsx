"use client"
import Image from 'next/image'
import Link from "next/link";
import React, {useState} from "react";

export default function Home() {

  const [city, setCity] = React.useState("");

  const search = () =>{

  }
  return (
    <main className='flex flex-col'>
      <nav className='flex p-5 h-20 justify-between'>
        <Link href='/' className='text-4xl'>Logo</Link>
        <div className='flex gap-10'>
          <Link href='/profile' className='text-lg m-auto'>Profile</Link>
          <button className='p-2 rounded border hover:bg-zinc-600'>Let's connect</button>
        </div>
      </nav>
      <hr />
      <section className='flex pe-4'>
        <div className='h-fit w-2/4 bg-zinc-900 flex flex-col p-20 mt-28 rounded-lg m-8'>
          <h1 className="text-5xl mb-5 font-mono flex justify-center">City</h1>
          <input
            className="mt-5 p-4 rounded-lg focus:outline-none focus:scale-105 text-black hover:bg-gray-300"
            id="username"
            type="text"
            placeholder="City Name"
            value={city}
            onChange={(e) =>{setCity(e.target.value)}}
          />
          <button onClick={search} className="mt-5 bg-blue-600 px-10 py-3 rounded-lg hover:bg-blue-700">Search</button> 
        </div>
        <div className='h-full w-2/4 flex flex-col'>
          <div className='h-full flex my-5'>
            <div className='bg-zinc-800 w-2/4 p-5 leading-9 mx-1 rounded-md'>
              <h4>CO :</h4>
              <h4>NO :</h4>
              <h4>NO<sub>2</sub>  :</h4>
              <h4>O<sub>3</sub>  :</h4>
            </div>
            
            <div className='bg-zinc-800 w-2/4 p-5 leading-9 mx-1 rounded-md'>
              <h4>SO<sub>2</sub> :</h4>
              <h4>Pm<sub>25</sub> :</h4>
              <h4>Pm<sub>10</sub> :</h4>
              <h4>NH<sub>3</sub>  :</h4>
            </div>
          </div>
          <hr/>


          <div className='mt-5 h-full bg-zinc-800 rounded-md'>
            <div className='flex justify-center p-2 font-mono text-lg'>
              Solution
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
