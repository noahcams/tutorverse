import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AssignmentList from '../AssignmentList/AssignmentList';

export default function Dashboard({
  match: {
    params: { uid },
  history
}}) {
  
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userDetail = await axios.get(`http://localhost:3000/api/users/${uid}`);
        setUser(userDetail.data);
      } catch (err) {
        console.error(err.message);
      }
    }
    getUser();
  }, [uid]);

  return (
    <div>
      <AssignmentList classId={user.classId} />
    </div>
  )
}
