import { ScrollArea } from "@/components/ui/scroll-area";
import AddButton from "@/components/AddButton";
import AllTasks from "@/components/AllTasks";
import ThemeSwitcher from "@/components/ThemeSwitcher";

interface Page_Props {
  params: {
    id: string;
  }
}

export default async function Page({params}:Page_Props) {

  const projectId = params.id;

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      
      <ThemeSwitcher/>

      <h1 className="text-5xl font-semibold noSelect text-center">Current Tasks</h1>
      <p className="mt-2 text-center">Go back by clicking the top left arrow</p>
      
      <ScrollArea className={'border-white mt-6 mb-6 h-3/6 w-[min(90%,800px)] rounded-md border myshadow justify-center items-center'}>

      <AllTasks projectId={projectId}/>

      </ScrollArea>

      <AddButton projectId={projectId}/>

    </main>
  )
}