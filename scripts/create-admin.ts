import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';
import Admin from '../src/models/admin.model';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  const hashedPassword = await bcrypt.hash('superpassadmin123', 10);

  const admin = new Admin({
    email: 'monmail@perso.com',
    password: hashedPassword,
  });

  await admin.save();
  console.log('✅ Admin créé avec succès');
  process.exit(0);
};

createAdmin().catch((err) => {
  console.error('❌ Erreur création admin :', err);
  process.exit(1);
});
