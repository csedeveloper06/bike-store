export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TUser = {
  name: TUserName;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'customer';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
