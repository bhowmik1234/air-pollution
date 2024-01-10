"use client"
import Image from 'next/image'
import Link from "next/link";
import React, { useState } from "react";
import { getAirDetails } from '@/helper/airDetails';
import toast, { Toaster } from 'react-hot-toast';


const notify = () => toast.error('City Name not Entered.');
const notify1 = () => toast.success('City found.');
const notify2 = () => toast.error('City Not found.');

export default function Home() {

  const [city, setCity] = React.useState("");
  const [det, setDet] = React.useState([
    {
      "name": "co",
      "plant": ["Aloe Vera", "Snake Plant", "Chrysanthemum"],
      "description": ""
    },
    {
      "name": "no",
      "plant": ["English Ivy", "Peace Lily", "Sansevieria trifasciata"],
      "description": ""
    },
    {
      "name": "no2",
      "plant": ["Chrysanthemum ", "Ficus elastica", "Dypsis lutescens"],
      "description": ""
    },
    {
      "name": "o3",
      "plant": ["Zamioculcas zamiifolia (ZZ plant)", "Golden Pothos", "Aglaonema"],
      "description": ""
    },
    {
      "name": "so2",
      "plant": ["Ficus benjamina", "Tiger bark", "Dracaena"],
      "description": ""
    },
    {
      "name": "pm25",
      "plant": ["Spider Plant", "Boston Fern", "Bamboo Palm"],
      "description": ""
    },
    {
      "name": "pm10",
      "plant": ["Areca Palm", "Rubber Plant", "Moth Orchid"],
      "description": ""
    },
    {
      "name": "nh3",
      "plant": ["No plants."],
      "description": "Plants are generally not known for their ability to specifically absorb ammonia (NH3) from the air. Using air purifiers with activated carbon filters. it's recommended to explore specific air purification technologies or consult with experts in indoor air quality for tailored solutions."
    },
  ]);

  const [co, setCo] = React.useState("0");
  const [nh3, setNh3] = React.useState("0");
  const [no, setNo] = React.useState("0");
  const [no2, setNo2] = React.useState("0");
  const [o3, setO3] = React.useState("0");
  const [pm25, setPm25] = React.useState("0");
  const [pm10, setPm10] = React.useState("0");
  const [so2, setSo2] = React.useState("0");

  // button function
  const search = async () => {
    if(city === "")
    {
      notify();
    }
    else{
      try{
        const detail = await getAirDetails(city);
        setCo(detail.co);
        setNh3(detail.nh3);
        setNo(detail.no);
        setNo2(detail.no2);
        setO3(detail.o3);
        setPm25(detail.pm2_5);
        setPm10(detail.pm10);
        setSo2(detail.so2);
        notify1();
      }catch(error:any)
      {
        notify2();
      }
      
    }
  }
  return (
    <main className='flex flex-col'>
      {/* navbar */}
      <nav className='flex p-5 h-20 justify-between'>
        <Link href='/' className='text-4xl'>Logo</Link>
        <div className='flex gap-10'>
          <Link href='/' className='text-lg m-auto'>Home</Link>
          <Link href='/profile' className='text-lg m-auto'>Profile</Link>
          <button className='p-2 rounded border hover:bg-zinc-600'>Let's connect</button>
        </div>
      </nav>
      <hr />


      <section className='flex pe-4'>
        {/* search section */}
        <div className='h-fit w-2/5 bg-zinc-900 flex flex-col p-20 mt-28 rounded-lg m-8'>
          <h1 className="text-5xl mb-5 font-mono flex justify-center">City</h1>
          <input
            className="mt-5 p-4 rounded-lg focus:outline-none focus:scale-105 text-black hover:bg-gray-300"
            id="username"
            type="text"
            placeholder="City Name"
            value={city}
            onChange={(e) => { setCity(e.target.value) }}
          />
          <button onClick={search} className="mt-5 bg-blue-600 px-10 py-3 rounded-lg hover:bg-blue-700">Search</button>
          <Toaster position="top-center" reverseOrder={false}/>
        </div>


        <div className='h-full w-3/5 flex flex-col'>
          <div className='h-full flex flex-col my-5'>
            <div className='bg-zinc-800 rounded-md mx-1 p-2 flex'>
              <div className='flex m-auto gap-2 font-mono text-stone-300'><div className='my-auto rounded-full bg-green-600 w-2 h-2'></div>Good</div>
              <div className='flex m-auto gap-2 font-mono text-stone-300'><div className='my-auto rounded-full bg-lime-600 w-2 h-2'></div>Satisfactory</div>
              <div className='flex m-auto gap-2 font-mono text-stone-300'><div className='my-auto rounded-full bg-red-300 w-2 h-2'></div>Moderate</div>
              <div className='flex m-auto gap-2 font-mono text-stone-300'><div className='my-auto rounded-full bg-amber-500 w-2 h-2'></div>Poor</div>
              <div className='flex m-auto gap-2 font-mono text-stone-300'><div className='my-auto rounded-full bg-red-500 w-2 h-2'></div>Unhealthy</div>
              <div className='flex m-auto gap-2 font-mono text-stone-300'><div className='my-auto rounded-full bg-orange-600 w-2 h-2'></div>Hazardous</div>
            </div>
            <div className='flex mt-2'>
              <div className='bg-zinc-800 w-2/4 p-5 leading-9 mx-1 rounded-md'>
                <h4>CO : <span className={
                  (co >= '0' && co <= '1000') ? 'text-green-600' :
                    (co >= '1100' && co <= '2000') ? 'text-lime-600' :
                      (co >= '2100' && co <= '10000') ? 'text-red-300' :
                        (co >= '10100' && co <= '17000') ? 'text-amber-500' :
                          (co >= '17100' && co <= '34000') ? 'text-red-500' :
                            (co >= '34000') ? 'text-orange-600' : ''
                }>{co} μg/m3</span> </h4>
                <h4>NO : <span className={
                  (no >= '0' && no <= '10') ? 'text-green-600' :
                    (no >= '11' && no <= '20') ? 'text-lime-600' :
                      (no > '20' && no <= '50') ? 'text-red-300' :
                        (no >= '51' && no <= '100') ? 'text-amber-500' :
                          (no >= '101' && no <= '200') ? 'text-red-500' :
                            (no >= '201') ? 'text-orange-600' : ''
                }>{no} μg/m3</span> </h4>

                <h4>NO<sub>2</sub>  : <span className={
                  (no2 >= '0' && no2 <= '40') ? 'text-green-600' :
                    (no2 >= '41' && no2 <= '80') ? 'text-lime-600' :
                      (no2 >= '81' && no2 <= '180') ? 'text-red-300' :
                        (no2 >= '181' && no2 <= '280') ? 'text-amber-500' :
                          (no2 >= '281' && no2 <= '400') ? 'text-red-500' :
                            (no2 >= '400') ? 'text-orange-600' : ''
                }>{no2} μg/m3</span> </h4>

                <h4>O<sub>3</sub>  : <span className={
                  (o3 >= '0' && o3 <= '50') ? 'text-green-600' :
                    (o3 >= '51' && o3 <= '100') ? 'text-lime-600' :
                      (o3 >= '101' && o3 <= '168') ? 'text-red-300' :
                        (o3 >= '169' && o3 <= '208') ? 'text-amber-500' :
                          (o3 >= '209' && o3 <= '784') ? 'text-red-500' :
                            (o3 >= '785') ? 'text-orange-600' : ''
                }>{o3} μg/m3</span> </h4>
              </div>

              <div className='bg-zinc-800 w-2/4 p-5 leading-9 mx-1 rounded-md'>
                <h4>SO<sub>2</sub> : <span className={
                  (so2 >= '0' && so2 <= '40') ? 'text-green-600' :
                    (so2 >= '41' && so2 <= '80') ? 'text-lime-600' :
                      (so2 >= '81' && so2 <= '380') ? 'text-red-300' :
                        (so2 >= '381' && so2 <= '800') ? 'text-amber-500' :
                          (so2 >= '801' && so2 <= '1600') ? 'text-red-500' :
                            (so2 >= '1601') ? 'text-orange-600' : ''
                }>{so2} μg/m3</span> </h4>

                <h4>Pm<sub>25</sub> : <span className={
                  (pm25 >= '0' && pm25 <= '30') ? 'text-green-600' :
                    (pm25 >= '31' && pm25 <= '60') ? 'text-lime-600' :
                      (pm25 >= '61' && pm25 <= '90') ? 'text-red-300' :
                        (pm25 >= '91' && pm25 <= '120') ? 'text-amber-500' :
                          (pm25 >= '121' && pm25 <= '250') ? 'text-red-500' :
                            (pm25 >= '251') ? 'text-orange-600' : ''
                }>{pm25} μg/m3</span> </h4>
                <h4>Pm<sub>10</sub> : <span className={
                  (pm10 >= '0' && pm10 <= '50') ? 'text-green-600' :
                    (pm10 >= '51' && pm10 <= '100') ? 'text-lime-600' :
                      (pm10 >= '101' && pm10 <= '250') ? 'text-red-300' :
                        (pm10 >= '251' && pm10 <= '350') ? 'text-amber-500' :
                          (pm10 >= '351' && pm10 <= '430') ? 'text-red-500' :
                            (pm10 >= '431') ? 'text-orange-600' : ''
                }>{pm10} μg/m3</span> </h4>
                <h4>NH<sub>3</sub>  : <span className={
                  (nh3 >= '0' && nh3 <= '200') ? 'text-green-600' :
                    (nh3 >= '201' && nh3 <= '400') ? 'text-lime-600' :
                      (nh3 >= '401' && nh3 <= '800') ? 'text-red-300' :
                        (nh3 >= '801' && nh3 <= '1200') ? 'text-amber-500' :
                          (nh3 >= '1201' && nh3 <= '1800') ? 'text-red-500' :
                            (nh3 >= '1801') ? 'text-orange-600' : ''
                }>{nh3} μg/m3</span> </h4>
              </div>
            </div>

          </div>
          <hr />


          <div className='mt-2'>
            <div className='flex justify-center p-2 font-mono text-lg  h-full bg-zinc-800 rounded-md'>
              Solution
            </div>

            <div className='bg-zinc-900 rounded-md h-72 w-full mt-2 ps-4 pe-12 overflow-auto'>
              {pm25 >= "61" ?
                <div className='py-2 px-1 bg-zinc-800 rounded-md w-full m-2'>
                  <h1 className='text-stone-300 font-mono text-xl'>To maintain Pm<sub>2.5</sub> Conc.  <span className='text-lime-400'>Grow</span></h1>
                  <p className='text-emerald-400 text-lg font-serif'>{det[5].plant[0]} | {det[5].plant[1]} | {det[5].plant[2]}</p>
                </div> : ''
              }

              {pm10 >= "101" ?
                <div className='py-2 px-1 bg-zinc-800 rounded-md w-full m-2'>
                  <h1 className='text-stone-300 font-mono text-xl'>To maintain Pm<sub>10</sub> Conc.  <span className='text-lime-400'>Grow</span></h1>
                  <p className='text-emerald-400 text-lg font-serif'>{det[6].plant[0]} | {det[6].plant[1]} | {det[6].plant[2]}</p>
                </div> : ''
              }

              {co >= "2100" ?
                <div className='py-2 px-1 bg-zinc-800 rounded-md w-full m-2'>
                  <h1 className='text-stone-300 font-mono text-xl'>To maintain CO Conc.  <span className='text-lime-400'>Grow</span></h1>
                  <p className='text-emerald-400 text-lg font-serif'>{det[0].plant[0]} | {det[0].plant[1]} | {det[0].plant[2]}</p>
                </div> : ''
              }

              {no >= "20" ?
                <div className='py-2 px-1 bg-zinc-800 rounded-md w-full m-2'>
                  <h1 className='text-stone-300 font-mono text-xl'>To maintain NO Conc.  <span className='text-lime-400'>Grow</span></h1>
                  <p className='text-emerald-400 text-lg font-serif'>{det[1].plant[0]} | {det[1].plant[1]} | {det[1].plant[2]}</p>
                </div> : ''
              }

              {so2 >= "51" ?
                <div className='py-2 px-1 bg-zinc-800 rounded-md w-full m-2'>
                  <h1 className='text-stone-300 font-mono text-xl'>To maintain SO<sub>2</sub> Conc.  <span className='text-lime-400'>Grow</span></h1>
                  <p className='text-emerald-400 text-lg font-serif'>{det[4].plant[0]} | {det[4].plant[1]} | {det[4].plant[2]}</p>
                </div> : ''
              }

              {o3 >= "101" ?
                <div className='py-2 px-1 bg-zinc-800 rounded-md w-full m-2'>
                  <h1 className='text-stone-300 font-mono text-xl'>To maintain O<sub>3</sub> Conc.  <span className='text-lime-400'>Grow</span></h1>
                  <p className='text-emerald-400 text-lg font-serif'>{det[3].plant[0]} | {det[3].plant[1]} | {det[3].plant[2]}</p>
                </div> : ''
              }

              {no2 >= "81" ?
                <div className='py-2 px-1 bg-zinc-800 rounded-md w-full m-2'>
                  <h1 className='text-stone-300 font-mono text-xl'>To maintain NO<sub>2</sub> Conc.  <span className='text-lime-400'>Grow</span></h1>
                  <p className='text-emerald-400 text-lg font-serif'>{det[2].plant[0]} | {det[2].plant[1]} | {det[2].plant[2]}</p>
                </div> : ''
              }

              {nh3 >= "401" ?
                <div className='py-2 px-1 bg-zinc-800 rounded-md w-full m-2'>
                  <h1 className='text-stone-300 font-mono text-xl'>To maintain NH<sub>3</sub> Conc.  <span className='text-lime-400'>Grow</span></h1>
                  <p className='text-emerald-400 text-lg font-serif'>{det[7].plant[0]}</p>
                  <p className='text-rose-500 text-lg font-serif'>{det[7].description}</p>
                </div> : ''
              }


            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
