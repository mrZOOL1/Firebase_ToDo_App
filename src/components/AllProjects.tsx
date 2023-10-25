'use client';
import React, { useState, useEffect} from 'react';
import Project from '@/components/Project';
import app from '@/config/firebase';
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";



const AllProjects = () => {

  const [Projects, SetProjects] = useState<any>([])

  const getAll = async function () {

    const db = getFirestore(app);
    const colRef = collection(db, 'projects');
    const q = query(colRef, orderBy('time', 'asc'));
    await getDocs(q)
      .then((snapshot) => {
        let projects: any[] = [];
        snapshot.docs.forEach((doc) => {
          projects.push({ ...doc.data(), id: doc.id })
        })
        SetProjects(projects);
      })
  }

  useEffect(() => {
    getAll();
  },[]);


  return (
    <div className='flex flex-col gap-2 p-2'>
      {Projects?.length === 0 && <p className="noSelect text-2xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">Looks empty in here...</p>}
      {Projects.map((project:any) => <Project key={project.id} id={project.id} text={project.text}/>)}
    </div>
  )
}

export default AllProjects