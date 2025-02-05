import mongoose from 'mongoose';

const institutionSchema = new mongoose.Schema({
  institutionName: { type: String, required: false },
  address: { type: String, required: false },
  state: { type: String, required: false },
  pinCode: { type: String, required: false },
  city: { type: String, required: false },
  contactPersonName: { type: String, required: false },
  contactPersonNumber: { type: String, required: false },
});

export default mongoose.model('Institution', institutionSchema);
