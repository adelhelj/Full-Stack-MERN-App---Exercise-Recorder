import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditExercisePage = ({exerciseToEdit}) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = { name: name, reps: reps, weight: weight, unit: unit, date: date }
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify( editedExercise ),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert(`Status code = ${response.status}. Exercise edited successfully.`);
        } else {
            alert(`Status code = ${response.status}. Exercise failed to edit.`);
        }
        navigate("/");
    };

    return (
        <div>
            <h2>Edit exercise and save</h2>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}/>
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.value)}/>
            <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)}/>
            <select name="unit" id="units" onChange={e => setUnit(e.target.value)}>
                <option value={unit} selected disabled hidden>{unit}</option>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)}/>
            <button onClick={editExercise}>Save</button>
        </div>
    )
}

export default EditExercisePage;