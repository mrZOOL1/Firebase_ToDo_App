'use client';
import Link from 'next/link';
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
import { doc, deleteDoc, collection, getDocs, query, where, writeBatch } from "firebase/firestore";
import { db } from '@/config/firebase';

interface Project_Props {
  text: string;
  id: string;
}

const Project = (props: Project_Props) => {

  const { toast } = useToast();

  const ProjectDelete = async function () {

    toast({title: "Great Success!", description: "Refresh the page to see the changes"});

    await deleteDoc(doc(db, "projects", props.id));

    const colRef = collection(db, 'tasks');
    const q = query(colRef, where("projectId", "==", props.id)); 
    await getDocs(q)
    .then((snapshot) => {
      snapshot.docs.forEach((docc) => {
        deleteDoc(doc(db, "tasks", docc.id));
      })
    })   
    
  }

  return (
    <section className='flex justify-between items-center'>

        <Link href={`/${props.id}`} className='noSelect text-xl hover:cursor-pointer hovered p-2 rounded-md transition-all'>{props.text}</Link>

        <div className="flex">

        <EditButton text={props.text} id={props.id}/>

        <AlertDialog>

            <AlertDialogTrigger className='noSelect ghostButton'><Trash2 className='blackwhite'/></AlertDialogTrigger>

            <AlertDialogContent className='noSelect border border-white'>

                <AlertDialogHeader>

                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel className='cancel'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className ='hover:bg-red-600' onClick={() => ProjectDelete()}>Delete</AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>

        </div>

    </section>
  )
}

export default Project