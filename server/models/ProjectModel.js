const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    description: {
        type: String
    },
    docs: {
        type: String
    },
    img: {
        type: String
    },
    reference: [
        {
            link1: String,
            link2: String
        },
        {
            link1: String,
            link2: String
        },
        {
            link1: String,
            link2: String
        },
        {
            link1: String,
            link2: String
        }
    ]
});

  
  
  module.exports = mongoose.model("Project", projectSchema);