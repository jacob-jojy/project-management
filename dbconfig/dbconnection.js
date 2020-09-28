const mongoose = require('mongoose');

const connect = function () {
  const url = "mongodb://localhost:27017/project-management";
  const options = {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true };

  mongoose.connect(url, options)
  .then(async (db,err)=>{
      if(err)
          console.log("err connecting to db",err)
      console.log("connected to DB!!")
  })
};

module.exports.connect = connect;
