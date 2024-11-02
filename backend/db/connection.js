import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

export default async function main() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao banco!");
  } catch (error) {
    console.log(`Erro: ${error}`);
    process.exit(1);
  }
}
