'use client'
import React from 'react'

function Tab({tabs, selectedTab, setSelectedTab}:{tabs:number[]|undefined, selectedTab:number|undefined, setSelectedTab:React.Dispatch<React.SetStateAction<number|undefined>>}) {
  return (
    <div className=' flex justify-start items-start mx-4  '>
        {tabs?.map((item:number,index:number)=>{
            return(
                <span className={selectedTab===item ?'p-3 rounded-t-md cursor-pointer bg-dark-elevated' :'p-3 rounded-t-md cursor-pointer bg-dark-depth' } onClick={()=>setSelectedTab(item)} key={index}>
                    {item}

                </span>
            )
           
        })}

    </div>
  )
}

export default Tab