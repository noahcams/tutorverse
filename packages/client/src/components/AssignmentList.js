import React, { useState, useEffect } from 'react';
import AssignmentDetails from '../AssignmentDetails/AssignmentDetails';

export default function AssignmentList({ classId }) {
  const [assignmentList, setAssignmentList] = useState([]);
  // get request for state
  useEffect(() => {
    try {
      const assignments = await axios.get(`http://localhost:3000/api/assignments`);
      setAssignmentList(assignments.data);
    } catch (err) {
      console.error(err.message);
    }
  }, [input]);


	return (
		<div>
			<ul>
				<li>
					<AssignmentDetails />
				</li>
				<li>
					<AssignmentDetails />
				</li>
				<li>
					<AssignmentDetails />
				</li>
			</ul>
		</div>
	);
}
