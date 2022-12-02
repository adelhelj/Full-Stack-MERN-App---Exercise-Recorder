import React from 'react';
import '../App.css';
import { MdEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

function ExerciseRow({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td>{ exercise.name }</td>
            <td>{ exercise.reps }</td>
            <td>{ exercise.weight }</td>
            <td>{ exercise.unit }</td>
            <td>{ exercise.date }</td>
            <td><MdEditNote className={"clickIcon"} onClick={ () => onEdit(exercise)}/></td>
            <td><MdDeleteOutline className={"clickIcon"} onClick={ () => onDelete(exercise._id) }/></td>
        </tr>
    );
}

export default ExerciseRow;