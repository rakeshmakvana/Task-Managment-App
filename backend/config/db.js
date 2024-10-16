import mongoose from "mongoose";

const mongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_STRING);
    console.log(`MongoDB Database Connected`);
  } catch (error) {
    console.log(error);
  }
};

export default mongoDBConnect;
