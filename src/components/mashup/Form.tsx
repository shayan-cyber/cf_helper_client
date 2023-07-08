
'use client'
import React, { useEffect, useState } from 'react'

import {VscAdd, VscSymbolEvent} from 'react-icons/vsc'
import { fetchUserInfo, userInfo } from '../../../utilities/api_calls/cf'
import Image from 'next/image'
import { Problem, createMashup } from '../../../utilities/api_calls/api'
function Form({problems, setProblems, setTabs,tabs, setSelectedTab, selectedTab}: { problems: Problem[], setProblems: React.Dispatch<React.SetStateAction<Problem[]>> , setTabs: React.Dispatch<React.SetStateAction<number[]>>, setSelectedTab:React.Dispatch<React.SetStateAction<number|undefined>>, tabs:number[]|undefined, selectedTab:number|undefined}) {

    const [handle, setHandle] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userDetails, setUserDetails] = useState<userInfo[]>([]) 
    const [selectedRatings, setSelectedRatings] = useState<number[]>([])
    const [limits, setLimits] = useState<number[]>([])
    const [ratedProblems, setRatedProblems] = useState<any>([])

    const [handles, setHandles] = useState<string[]>([])
    const ratings = [
        800, 1000, 1100, 1200
    ]

    /**
     * Handles the click event.
     *
     * @return {void} No return value.
     */


    useEffect(() => {
        setProblems(ratedProblems[selectedTab?selectedTab:selectedRatings[0]])
        console.log({selectedTab});
        
    },[selectedTab])
    const handleClick = ():void => {
        if(isLoading){
            return
        }
        console.log(handle);
        
        setIsLoading(true)

        fetchUserInfo(handle).then((res)=>{
            console.log(res)
            setIsLoading(false)
            setUserDetails([...userDetails, res])
            setHandles([...handles, handle])
            setHandle('')
        }).catch((e)=>{
            console.log(e)
            setIsLoading(false)
        })
        
    }

    const genMashup = ()=>{
        if(isLoading){
            return
        }
        setIsLoading(true)
        createMashup(handles, selectedRatings,limits).then((res)=>{
            console.log(res);
            var probs =[]
            probs = res[selectedTab?selectedTab:selectedRatings[0]];
            setRatedProblems(res)
            setProblems(probs)
            setSelectedTab(selectedRatings[0])
            setIsLoading(false)
            setTabs([...selectedRatings])
            
        }).catch(e=>{
            console.log(e);
            setIsLoading(false)
            
        })
    }


    

  return (
    <div className='dark:bg-dark-elevated rounded-lg p-4 text-base w-full md:w-1/2'>
        <div className='flex justify-start items-center my-4'>
            {/* avatars */}
            {userDetails.map((user, index) => (
                <div className='w-12 h-12 rounded-full relative mx-1' key={index}>
                    <Image src={user.avatar} alt='avatar' className='rounded-full' fill />
                </div>
            ))}
        </div>

        <div className='flex justify-start items-center '>

             <input type='text' value={handle} onChange={(e)=>setHandle(e.target.value)} className='dark:bg-dark-depth rounded-md p-2 placeholder:text-gray-500 w-1/2 focus:outline-none' placeholder='Add handle..' />
             <div className='p-1'>
                 <button className='dark:bg-dark-depth rounded-full p-2 shadow-lg disabled:cursor-not-allowed' onClick={handleClick} disabled={isLoading}>
                    <VscAdd className='fill-gray-400'/>
                 </button>
             </div>
        </div>

        <div className='flex justify-start items-center my-4'>

            {ratings.map((rating, index) => (
                <span key={index} className={selectedRatings.includes(rating) ? 'p-2 mx-2 text-xs text-center h-12 w-12 flex justify-center items-center rounded-full bg-emerald-700 cursor-pointer' : 'p-2 mx-2 text-xs text-center h-12 w-12 flex justify-center items-center rounded-full bg-emerald-500 cursor-pointer'} onClick={()=>{
                    setSelectedRatings([...selectedRatings, rating])
                    
                    setLimits([...limits,10])
                }}>
                    <h1>{rating}</h1>
                </span>
            ))}
            

        </div>

        <div className='flex justify-start items-center'>
            <button className='bg-emerald-500 rounded-md p-2 shadow-lg w-full disabled:opacity-40 disabled:cursor-not-allowed' onClick={genMashup} disabled={isLoading}>
                <span className='flex justify-center items-center'>
                    <h1>Mash It Up</h1>
                    <VscSymbolEvent className='fill-white mx-1 text-xl'/>
                </span>
            </button>

        </div>



    </div>
  )
}

export default Form