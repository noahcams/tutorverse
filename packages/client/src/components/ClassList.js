import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ClassList({ user }) {
  const [classes, setClasses] = useState();
	const [keys, setKeys] = useState(user.classIds);

  async function getResource(resource) {
    const { data } = await axios.get(`http://localhost:3001/classes/${resource}`)
    console.log(data)
    setClasses([...classes, data])
  }

  const getClasses = async () => {
    try {
      keys.map(async k => {
        const fetched = await axios.get(`http://localhost:3001/classes/${k}`)
        setClasses([...classes, fetched.data])
      })

      // const cls = await axios.get(`http://localhost:3001/classes/${classId}`);
      // setClasses((classes) => [...classes, cls.data]);
      // const classes = await axios.get(`http://localhost:3001/classes/`,{
			// 	params: keys
			// })
    } catch(err) {
      console.error(err);
    }
  }
  
  useEffect(() => {
    // classIds.forEach(classId => getClasses(classId));
    getClasses()
    console.log(classes)
  }, []);

<<<<<<< HEAD
=======

>>>>>>> ff4dacb (class details)
  return (
    <div className="classes">
      {/* {classes.map((cls, i) => <ClassDetails cls={cls} key={i} />)} */}
    </div>
  )
}
