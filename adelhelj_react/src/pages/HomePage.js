import React, {  useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ExerciseTable from '../components/ExerciseTable';

function HomePage({ setExerciseToEdit }) {

    const navigate = useNavigate()
    const [exercises, setExercises] = useState([]);

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`)
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    }

    const loadExercises = async () => {
      const response = await fetch('/exercises');
        const data = await response.json();
      setExercises(data);
    };

    useEffect(() => {
      loadExercises();
    }, []);

    return (
        <>
        <h2>Enter values for a weight-lifting exercise.</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                
        </table>
            <ExerciseTable exercises={exercises} onEdit={onEdit} onDelete={onDelete} /> 
        </> //Uses the ExerciseTable component to add the table into the HomePage
    );
}

export default HomePage;