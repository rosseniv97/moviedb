const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title:{type:mongoose.SchemaTypes.String,required:true,default:""},
    poster:{type:mongoose.SchemaTypes.String,required:true},
    year:{type:mongoose.SchemaTypes.Number},
    description:{type:mongoose.SchemaTypes.String}
})

module.exports = mongoose.model("Movie",movieSchema);