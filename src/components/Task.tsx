'use client';
import EditButton from './EditButton';
import {
AlertDialog,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTitle,
AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '@/config/firebase';

interface Task_Props {
  text: string;
  id: string;
  projectId: string;
}

const Task = (props: Task_Props) => {

  const { toast } = useToast();

  const TaskDelete = async function () {

    toast({title: "Great Success!", description: "Refresh the page to see the changes"});

    await deleteDoc(doc(db, "tasks", props.id));
    
  }

  return (
    <section className='flex justify-between items-center p-2'>

        <p className='noSelect text-xl hover:cursor-pointer hovered p-2 rounded-md transition-all'>{props.text}</p> 

        <div className="flex">

        <EditButton text={props.text} projectId={props.projectId} id={props.id}/>

        <AlertDialog>

            <AlertDialogTrigger className='noSelect ghostButton'><Trash2 className='blackwhite'/></AlertDialogTrigger>

            <AlertDialogContent className='noSelect border border-white'>

                <AlertDialogHeader>

                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel className='cancel'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className ='hover:bg-red-600' onClick={() =>TaskDelete()}>Delete</AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>

        </div>

    </section>
  )
}

export default Task