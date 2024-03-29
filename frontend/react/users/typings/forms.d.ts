import { Users } from 'typings';

export interface SignInForm {
  username: string;
  password: string;
}

export interface SignUpForm {
  email: string;
  username: string;
}

export interface NewPasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface GroupEditForm {
  id?: string;
  name: string;
  description: string;
  subject: string;
}

export interface UserForm {
  username: string;
  password: string;
}

export interface SettingsForm {
  notification1: string;
  notification2: string;
  activeStudent: string;
}

export interface QuestionForm {
  id?: string;
  title: string;
  answer: string;
  choices?: string;
}
