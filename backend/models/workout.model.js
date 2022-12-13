const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: { type: String, required: true },
  sets: { type: String, required: true },
  reps: { type: String, required: true },
  weight: { type: String, required: true },
})

const workoutsSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  exercises: [exerciseSchema],
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Workout = mongoose.model('Workout', workoutsSchema);

module.exports = Workout;