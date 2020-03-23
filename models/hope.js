const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hopeSchema = new Schema({
  "hope": String,
  "status": String
});

const db = mongoose.model('hopes', hopeSchema)

module.exports = db;