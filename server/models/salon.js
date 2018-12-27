import mongoose, { Schema } from 'mongoose'

const salonSchema = Schema({
  name: {
      type: String,
  },
   description: {
      type: String
   },
   price: {
      type: Number,
   },
   address: {
      type: String
   },
    postalCode: {
      type: String
    },
    openingHours: {
      type: String
    },
    phone: {
      type: String
    },
    web: {
      type: String
    },
   timeSlot: {
      type: String
   }
}, { collection : 'salons' });

export default mongoose.model('Salon', salonSchema)
