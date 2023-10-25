'use client';
import React, {useState} from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Pencil } from 'lucide-react';
  import { usePathname } from 'next/navigation';
  import { useToast } from "@/components/ui/use-toast"
  import { doc, updateDoc } from "firebase/firestore";
  import { db } from '@/config/firebase';

  export const revalidate = true;

  interface EditButton_Props {
    id:string;
    text: string;
    projectId?: string;
}

const EditButton = (props: EditButton_Props) => {

    const path = usePathname();
    const IsProject = path === '/';
    const [IsEditValid, SetIsEditValid] = useState(true);

    const { toast } = useToast();

    const EditForm = async function(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const editinput = document.querySelector(`#${props.id}`) as HTMLInputElement;
        const item = editinput.value;

        if (item.length === 0) {
          SetIsEditValid(false);
        }

        else {

            SetIsEditValid(true);

            toast({title: "Great Success!", description: "Refresh the page to see the changes"});

            await updateDoc(doc(db, IsProject ? 'projects' : 'tasks', props.id), {
              text: item
            });

        }
    }
    

  return (
    <Dialog>

        <DialogTrigger className='noSelect ghostButton' onClick={() => SetIsEditValid(true)}><Pencil className='blackwhite'/></DialogTrigger>

        <DialogContent className='noSelect border border-white'>

            <DialogHeader>
              <DialogTitle>Edit Your {`${IsProject ? 'Project' : 'Task'}`}</DialogTitle>
              <DialogDescription>{props.text}</DialogDescription>
            </DialogHeader>

            <form className="flex flex-col space-y-2" onSubmit={(e) => EditForm(e)}>

                <div className='flex w-full items-center space-x-2'>
                  <Input maxLength={100} name='edit' id={props.id} type="text" placeholder="New Text"/>
                  <Button type="submit">Edit</Button>
                </div>

                <Label className='ml-3 text-red-600' htmlFor="edit" style={{display: IsEditValid ? 'none' : ''}}>Required Field</Label>

            </form>

        </DialogContent>

    </Dialog>
  )
}

export default EditButton