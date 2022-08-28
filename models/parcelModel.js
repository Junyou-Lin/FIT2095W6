const mongoose = require('mongoose')

const parcelSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    fragile: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Parcel', parcelSchema)
