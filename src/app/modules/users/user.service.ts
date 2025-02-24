import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (password: string, userData: TUser) => {
  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);
  const newUser = await User.create(userData);
  return newUser;
};
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.aggregate([{ $match: { id } }]);
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.updateOne({ id }, { isDeleted: true });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
