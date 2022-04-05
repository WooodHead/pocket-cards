import { Users } from 'typings';

export interface SignInForm {
  username: string;
  password: string;
}

export interface SignUpForm {
  authority: string;
  email: string;
  username: string;
}

export interface NewPasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface GroupEditForm {
  name: string;
  description: string;
  subject: string;
}
