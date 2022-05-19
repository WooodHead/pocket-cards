import { Environment } from '@consts';

export const SUBJECT = {
  LANGUAGE: '1',
  SCIENCE: '2',
  SOCIETY: '3',
  ENGLISH: '0',
  ABILITY_LANGUAGE: '101',
  ABILITY_SCIENCE: '102',
  ABILITY_SOCIETY: '103',
  ABILITY_ENGLISH: '100',
};

export const SUBJECT_NORMAL = [SUBJECT.ENGLISH, SUBJECT.LANGUAGE, SUBJECT.SCIENCE, SUBJECT.SOCIETY];
export const SUBJECT_ABILITY = [
  SUBJECT.ABILITY_ENGLISH,
  SUBJECT.ABILITY_LANGUAGE,
  SUBJECT.ABILITY_SCIENCE,
  SUBJECT.ABILITY_SOCIETY,
];

export const PATH_PATTERN = 'pattern';
export const PATH_IMAGE = 'images';
export const PATH_VOICE = 'voices';

export const REPORT_TYPE = {
  // 日次進捗
  DAILY_PROGRESS: 'DAILY_PROGRESS',
  // 前回学習進捗
  OVERALL_TIMES: 'OVERALL_TIMES',
};

export const API_URLs = {
  describeUser: (userId: string) => `${Environment.ENDPOINT_USERS_SERVICE}/users/${userId}`,
  listAdmins: () => `${Environment.ENDPOINT_USERS_SERVICE}/users/admins`,
};

export const Authority = {
  ADMIN: 'TENANT_ADMIN',
  PARENT: 'PARENT',
  STUDENT: 'STUDENT',
};

export const ANSWER_CORRECT = '1';
export const ANSWER_INCORRECT = '0';

export const INITIAL_DATE = '19900101';
