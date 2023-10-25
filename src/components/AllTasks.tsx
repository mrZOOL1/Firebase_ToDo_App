'use client';
import React, { useState, useEffect} from 'react';
import Task from '@/components/Task';
import app from '@/config/firebase';
import { getFirestore, collection, getDocs, query, orderBy, where } from "firebase/firestore";

interface props {
    projectId: string;
}``
const Todos = (props: props) => {

  const [Tasks, SetTasks] = useState<any>([])

  const getAll = async function () {

    const db = getFirestore(app);
    const colRef = collection(db, 'tasks');
    const q = query(colRef, where("projectId", "==", props.projectId), orderBy('time', 'asc'));
    await getDocs(q)
      .then((snapshot) => {
        let projects: any[] = [];
        snapshot.docs.forEach((doc) => {
          projects.push({ ...doc.data(), id: doc.id })
        })
        SetTasks(projects);
      })
  }

  useEffect(() => {
    getAll();
  },[]);


  return (
    <div className='flex flex-col gap-2 p-2'>
      {Tasks?.length === 0 && <p className="noSelect text-2xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">Looks empty in here...</p>}
      {Tasks.map((task:any) => <Task key={task.id} id={task.id} text={task.text} projectId={props.projectId}/>)}
    </div>
  )
}

export default Todos