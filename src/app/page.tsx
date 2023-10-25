import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import AllProjects from "@/components/AllProjects";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import AddButton from "@/components/AddButton";

export default async function Home() {

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      
      <ThemeSwitcher/>

      <h1 className="text-5xl font-semibold noSelect text-center">Current Projects</h1>
      <p className="mt-2 text-center">Select a project to add tasks</p>
      
      <ScrollArea className={'border-white mt-6 mb-6 h-1/2 w-[min(90%,800px)] rounded-md border myshadow justify-center items-center'}>

      <AllProjects/>

      </ScrollArea>

      <AddButton/>

    </main>
  )
}
