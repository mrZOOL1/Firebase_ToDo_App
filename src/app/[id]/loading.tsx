import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import AddButton from '@/components/AddButton'
import ThemeSwitcher from '@/components/ThemeSwitcher'

const loading = () => {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
        <ThemeSwitcher/>

        <h1 className="text-5xl font-semibold noSelect">Current Tasks</h1>
        <p className="mt-2">Go back by clicking the top left arrow</p>
        
        <Skeleton className='skeleton mt-6 mb-6 h-1/2 w-[min(90%,800px)] rounded-md myshadow'/>

        <Skeleton className='skeleton h-10 w-32 rounded-md myshadow'/>
  </main>
  )
}

export default loading