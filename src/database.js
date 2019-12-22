const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/Mern-task';

mongoose.connect(URI, {
    useNewUrlParser : true,
    useFindAndModify : false,
    useCreateIndex : true,
    useUnifiedTopology : true
})
    .then(() => {
        console.log('Connection successful to the database');
    }).catch((e)=>{
        console.log(e);
});

module.exports = mongoose;

