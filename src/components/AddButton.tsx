'use client';
import React,{useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { nanoid } from 'nanoid'
import { doc, setDoc, Timestamp  } from "firebase/firestore";
import { db } from '@/config/firebase';

interface AddButton_Props {
  projectId?: string;
}

const AddButton = (props:AddButton_Props) => {
  
  const path = usePathname();
  const IsProject = path === '/';
  const [IsAddValid, SetIsAddValid] = useState(true);
  const [IsShortEnough, SetIsShortEnough] = useState(true);

  const { toast } = useToast();

  const AddForm = async function (e:React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    const addinput = document.querySelector('#add') as HTMLInputElement;
    const item = addinput.value.toString();

    if (item.length === 0) {
      SetIsAddValid(false);
    }
    else if (item.length > 30) {
      SetIsShortEnough(false);
    }
    else {
      SetIsAddValid(true);
      SetIsShortEnough(true);
      toast({title: "Great Success!", description: "Refresh the page to see the changes"});

      if (IsProject) {

        await setDoc(doc(db, "projects", nanoid()), {
          text: item,
          time: Timestamp.now()
        });

      } else {

        await setDoc(doc(db, "tasks", nanoid()), {
          text: item,
          time: Timestamp.now(),
          projectId: props.projectId
        }); 
      }
    }
  }

  return (
    <Dialog>

      <DialogTrigger className='noSelect button' onClick={() => {SetIsAddValid(true); SetIsShortEnough(true)}}>Add a New {`${IsProject ? 'Project' : 'Task'}`}</DialogTrigger>

      <DialogContent className='noSelect border border-white'>

        <DialogHeader>
          <DialogTitle>Add a New {`${IsProject ? 'Project' : 'Task'}`}</DialogTitle>
          <DialogDescription>Write Anything You Want</DialogDescription>
        </DialogHeader>

        <form className="flex flex-col space-y-2" onSubmit={(e) => AddForm(e)}>

          <div className='flex w-full items-center space-x-2'>

            <Input maxLength={100} name="add" id="add" type="text" placeholder="Your Text"/>
            <Button type="submit">Add</Button>

          </div>

          <Label className='ml-3 text-red-600' htmlFor="add" style={{display: IsAddValid ? 'none' : ''}}>Required Field</Label>
          <Label className='ml-3 text-red-600' htmlFor="add" style={{display: IsShortEnough ? 'none' : ''}}>Too Long</Label>

        </form>

      </DialogContent>

    </Dialog>
  )
}

export default AddButton