import React, { useEffect } from 'react';
import axios from 'axios';
import ClassDetails from './ClassDetails';
import Class from './ClassDetails';

export default function ClassList({ user }) {

  const { classIds } = user;

  const getClasses = async (classId) => {
    try {
      const cls = await axios.get(`http://localhost:3001/classes/${classId}`);
      console.log(cls);
    } catch(err) {
      console.error(err);
    }
  }
  
  useEffect(() => {
    classIds.forEach(classId => getClasses(classId));
  }, []);

  return (
    <div>
      <ClassDetails />
    </div>
  )
}
