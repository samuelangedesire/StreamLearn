import bcrypt from 'bcryptjs';
import connectMongoDB from '../../../lib/mongodbConnection';
import User from '../../../lib/Models/User';

export const register = async (values: any) => {
  try {
    const { name, email, password } = values;
    await connectMongoDB();

    //verifions que tous les champs ont bien été rempli

    if (!name || !email || !password) {
      return { error: 'Every fields are required' };
    }

    //verifions si l'email est deja dans notre base de donnée

    const userexist = await User.findOne({ email });
    if (userexist) {
      return { error: 'User already existed' };
    }

    const HashedPassword = bcrypt.hashSync(password, 10);
    await User.create({ name, email, password: HashedPassword });
  } catch (error) {
    console.error('something is not good', error);
    return { error: 'Failed to create user' };
  }
};
