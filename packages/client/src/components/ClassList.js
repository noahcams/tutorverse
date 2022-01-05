import React, { useEffect } from 'react';
import axios from 'axios';

export default function ClassList({ user }) {

  const { classIds } = user;
  console.log(classIds);

  const getClasses = async (classId) => {
    try {
      const cls = await axios.get(`http://localhost:3001/classes/${classId}`);
      console.log(cls);
    } catch(err) {
      console.error(err);
    }
  }
  
  useEffect(() => {
    classIds.forEach(classId => getClasses(classId))
  }, []);

  return (
    <div>
      
    </div>
  )
}
