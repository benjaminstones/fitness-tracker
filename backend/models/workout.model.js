const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutsSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  exercises: { type: Array, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Workout = mongoose.model('Workout', workoutsSchema);

module.exports = Workout;