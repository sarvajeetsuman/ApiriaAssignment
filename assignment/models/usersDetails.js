var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userDetailsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


var UserDetails = mongoose.model('UserDetail', userDetailsSchema);
module.exports = UserDetails;