import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { UseNewUrlParser: true }
);

/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Defines the Schema
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const db = mongoose.connection;
const exercisesSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, min: [1, 'Reps property must be an integer greater than 0.'], required: true },
    weight: { type: Number, min: [1, 'Weight property must be an integer greater than 0.'], required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});


/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Compiles the model from the schema. This must be done after defining the schema
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const Exercise = mongoose.model('Exercise', exercisesSchema);


/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Create using POST /exercises in the exercises_controller.mjs
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

/**
 * Creates a Exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
};

/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Read using GET / exercises
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
};


/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
GET using GET /exercises/:_id; returns JSON array
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
};


/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Update using PUT /exercises/:_id
Returns a promise.
Resolves to JSON objects updated.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const validation = { runValidators: true, context: 'query' };
const updateExercise = async (_id, name, reps, weight, unit, date) => {
  const result = await Exercise.updateOne(
      { _id: _id }, { name: name, reps: reps, weight: weight, unit: unit, date: date }, validation
  );
  return result;
};


/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELETE using DELETE /exercises/:_id
Returns a promise.
Resolves to deletedCount of deleted exercise objects. 
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
const deleteExercise = async (id) => {
    const result = await Exercise.deleteOne({ _id: id });
    return result.deletedCount;
};


/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Indicates if successfully connected to PORT=3000
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

export { createExercise, findExercises, findExerciseById, updateExercise, deleteExercise, }