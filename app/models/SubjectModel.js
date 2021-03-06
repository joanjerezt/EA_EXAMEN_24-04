/**
 * Created by juan on 23/04/17.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');

/*** OK ***/

var subjectSchema = new Schema({
    name: {type: String, unique: true},
    periode: {type: Number}, //012016 Primavera 2016, 022016 Tardor 2016
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentModel'
    }]
});

subjectSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('subjectModel', subjectSchema);