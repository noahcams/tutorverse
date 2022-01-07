import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClassDetails from './ClassDetails';
import Class from './ClassDetails';

export default function ClassList({ user }) {
  const [classes, setClasses] = useState([]);

  const { classIds } = user;

  const getClasses = async (classId) => {
    try {
      const cls = await axios.get(`http://localhost:3001/classes/${classId}`);
      setClasses((classes) => [...classes, cls.data]);
    } catch(err) {
      console.error(err);
    }
  }
  
  useEffect(() => {
    classIds.forEach(classId => getClasses(classId));
  }, []);

  console.log(classes);

  return (
    <div className="classes">
      {classes.map((cls, i) => <ClassDetails cls={cls} key={i} />)}
    </div>
  )
}
