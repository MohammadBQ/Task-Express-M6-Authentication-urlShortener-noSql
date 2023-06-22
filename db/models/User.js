const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type: String, unique:true , required:true },
  password: {type: String, required: true},
  urls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
    },
  ],
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("User", UserSchema);