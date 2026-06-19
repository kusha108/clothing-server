import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connection = async (username, password) => {
  const URL = `mongodb://${username}:${password}@ac-syivh48-shard-00-00.wiwaww2.mongodb.net:27017,ac-syivh48-shard-00-01.wiwaww2.mongodb.net:27017,ac-syivh48-shard-00-02.wiwaww2.mongodb.net:27017/?ssl=true&replicaSet=atlas-hllx1t-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ecommerce-web`;

  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error while connecting with database:', error.message);
  }
};

export default connection;






