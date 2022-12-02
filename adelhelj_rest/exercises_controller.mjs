import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

const unitAcceptable = ['lbs','kgs'];
const dateAcceptable = "MM-DD-YY";


const invalidUnitResponse = {
  error: `Invalid weight entered. You must use one of these string units: ${unitAcceptable}`,
};

const invalidDateResponse = {
  error: `Invalid date entered. You must input dates like this: ${dateAcceptable}, where MM, DD and YY are 2 digit integers.`,
};

// Boolean returns True if the unit format is correct
function unitValid(unit) {
  return unitAcceptable.includes(unit);
}

// Boolean returns True if the date format is correct
function dateValid(date) {
  // Test using a regular expression.
  const format = /^\d{2}-\d{2}-\d{2}$/;
  return format.test(date);
}

function unitDateValid(req, res) {
  if (!dateValid(req.body.date)) {
    res.status(400).json(invalidDateResponse);
  }
  if (!unitValid(req.body.unit)) {
    res.status(400).json(invalidUnitResponse);
  }
}

/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Create using POST /exercises
Create a new exercise with the name, reps, weight, unit, and date provided in the body
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
app.post('/exercises', (req, res) => {
  unitDateValid(req, res);
  if (!res.headersSent) {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status case 400 in case of error.
            res.status(400).json({ Error: 'Invalid request' });
        });
  }
});





/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Read using GET / exercises
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
app.get('/exercises', (req, res) => {
    exercises.findExercises()
      .then(exercises => {
        res.status(200).json(exercises)
      })
      .catch(error => {
        console.error(error);
        res.send({ Error: 'Request failed' });
    });
});




/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
GET using GET /exercises/:_id; returns JSON array
Retrieve the exercise corresponding to the ID provided in the URL
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
app.get("/exercises/:_id", (req, res) => {
  const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
        if (exercise !== null) {
            res.status(200).json(exercise);
        } else {
            res.status(404).json({ Error: 'Resource not found' })
        }
    })
    .catch (error => {
        res.status(400).json({ Error: 'Invalid request' });
    })
});



/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Update using PUT /exercises/:_id
Returns a promise.
Resolves to JSON objects updated.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
app.put("/exercises/:_id", (req, res) => {
  unitDateValid(req, res);
  if (!res.headersSent) {
    exercises.updateExercise(req.params._id, req.body.name,req.body.reps,req.body.weight, req.body.unit, req.body.date)
      .then(numUpdated => {
        if (numUpdated.matchedCount === 1) {
          res.status(200).json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date});
        } else {
          res.status(404).json({ Error: "Not found" });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json({ error: 'Invalid request' });
      });
  }
});


/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELETE using DELETE /exercises/:_id
Returns a promise.
Resolves to deletedCount of deleted exercise objects. 
Delete exercise by matching the ID 
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
app.delete("/exercises/:_id", (req, res) => {
  exercises.deleteExercise(req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "Not found" });
      }
    })
});


/*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Indicates if connected on PORT=3000
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});