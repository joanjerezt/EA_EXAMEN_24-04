/**
 * Created by juan on 23/04/17.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');

/*** OK ***/

var studentSchema = new Schema({
    name: {type: String, unique: true},
    address: {type: String},
    phones: [
        {
            type: {type: String},
            number: {type: Number}
        }],
    studies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subjectModel'
    }]
});

studentSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('studentModel', studentSchema);