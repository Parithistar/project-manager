const mongoose=require('mongoose')


const importSchema=new mongoose.Schema({

    contact: [{
      name: {
        type: String,
        required: true,
      },
      designation: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      industry: {
        type: String,
        required: true,
      },
      email: String,
      phoneNumber: {
        type: String,
        required: true,
        minLength: 10,
      },
      country: {
        type: String,
        required: true,
      },
      
    },
    
    
  ],
  
  userId: String,
    
  });

const importModal=mongoose.model("Import",importSchema);
module.exports=importModal;

