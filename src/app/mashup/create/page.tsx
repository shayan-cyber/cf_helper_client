
'use client'
import Form from "@/components/mashup/Form"
import ProblemsList from "@/components/mashup/ProblemsList"
import { useState } from "react"
import { Problem } from "../../../../utilities/api_calls/api"
import Tab from "@/components/mashup/Tab"

export default function CeateMashup() {
    const [problems, setProblems] = useState<Problem[]>([])
    const [selectedTab, setSelectedTab] = useState<number>()
    const [tabs, setTabs] = useState<number[]>([])

    return <>

        <div className="text-2xl flex justify-center items-center p-4">
            <Form problems={problems} setProblems={setProblems} setTabs={setTabs} setSelectedTab={setSelectedTab} tabs={tabs} selectedTab={selectedTab}/>
        </div>


        <div className="mx-1">
            <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs}/>

        </div>
        <div className="flex justify-center items-center">
            <ProblemsList problems={problems}/>

        </div>
    </>
    
}