const mongoose = require('mongoose');

const takimSchema = new mongoose.Schema({
  team_name: String,
  team_logo: String,
  played: String,
  wins: String,
  draws: String,
  losses: String,
  goals_for: String,
  goals_against: String,
  goal_diff: String,
  points: String,
  points_per_match: String,
  last_5_matches: String,
  attendance_per_game: String,
  top_scorers: {
    names: [String],
    score: String
  },
  goalkeepers: [String]
});

module.exports = mongoose.model('Takim', takimSchema); 