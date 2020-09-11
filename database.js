const mongoose = require('mongoose');

if(process.env.NODE_ENV !== 'production'){
  require ('dotenv').config();
}

const URI = process.env.MONGODB_URI
? process.env.MONGODB_URI
:'mongodb://localhost/camillatormeandb';


mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err  => console.error(err));

module.exports = mongoose;
