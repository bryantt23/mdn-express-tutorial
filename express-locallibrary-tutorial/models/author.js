var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date }
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function () {
  return this.family_name + ', ' + this.first_name;
});

// https://www.w3resource.com/javascript-exercises/javascript-date-exercise-18.php
function calculate_age(dob, death) {
  var diff_ms = death - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function () {
  if (!this.date_of_birth) {
    return 'Unknown lifespan';
  }

  const birth = this.date_of_birth;

  const death = !this.date_of_death ? new Date() : this.date_of_death;

  const age = calculate_age(birth, death);

  return age;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
