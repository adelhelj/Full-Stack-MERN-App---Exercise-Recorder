import React from "react";
import ExerciseRow from './ExerciseRow';
import '../App.css';

function ExerciseTable({ exercises, onDelete, onEdit }) {
    return (
        <table>
            <tbody>
                {exercises.map((exercise, i) => <ExerciseRow exercise={exercise} onEdit={onEdit} onDelete={onDelete} key={i} />)}
            </tbody>
        </table> 
)}

export default ExerciseTable;