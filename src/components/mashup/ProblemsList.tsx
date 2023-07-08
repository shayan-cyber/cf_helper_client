'use client'
import React from 'react'
import { Problem } from '../../../utilities/api_calls/api'
import Link from 'next/link'

function ProblemsList({problems}: { problems: Problem[] }) {
  return (
    <div className='bg-dark-elevated shadow-lg rounded-md  w-full mx-4'>
        {problems?.map((problem:Problem, index:number) => (
            <div className='grid grid-cols-3 border border-dark-depth p-3 hover:bg-dark-depth rounded-md cursor-pointer' key={index}>

                <Link href={problem.link}>
                    <h1 className='text-lg text-emerald-400 cursor-pointer'>{problem.name}</h1>
                </Link>
                <span className='text-lg'>
                    {problem.contestId}

                </span>

                <span className='text-lg'>
                    {problem.index}
                </span>
                

             </div>
        ))}
        

    </div>
  )
}

export default ProblemsList