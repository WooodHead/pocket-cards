import { Tables } from './tables';

export namespace Users {
  interface CognitoInfos {
    Authority?: string;
    UserPoolId?: string;
    ClientId?: string;
    IdentityPoolId?: string;
  }

  interface TenantUser {
    /** user id */
    userId: string;
    /** username */
    userName: string;
    /** email */
    email: string;
    /** role */
    role?: string;
  }

  interface GetUserResquest {}

  interface GetUserResponse {
    userId: string;
    userName: string;
    role: string;
  }

  interface CreateAdminRequest extends TenantUser {}

  interface CreateAdminResponse {
    /** user id */
    userId: string;
    /** user name */
    userName: string;
    /** email */
    email?: string;
  }

  interface LookupUserRequest {}

  interface LookupUserResponse {
    /** is user exist */
    isExist: boolean;
    /** user authority */
    authority?: string;
    /** user pool id */
    userPoolId?: string;
    /** user pool client id */
    clientId?: string;
    /** identity pool id */
    identityPoolId?: string;
  }

  interface CreateUserRequest extends TenantUser {}

  interface CreateUserResponse {
    success: boolean;
    message?: string;
    userId?: string;
  }

  interface ListAdminUsersRequest {}

  interface ListAdminUsersResponse {
    users: string[];
  }

  interface CreateStudentRequest {
    username: string;
    password: string;
  }

  interface CreateStudentResponse {
    success: string;
  }

  interface GetStudentRequest {}

  interface GetStudentResponse {
    count: number;
    items: Tables.TUsers[];
  }

  interface DescribeUserParameter {
    userId: string;
  }

  interface DescribeUserRequest {}

  type DescribeUserResponse = Tables.TUsers;

  interface GetUserCurriculumsParameter {
    userId: string;
  }

  interface GetUserCurriculumsRequest {}

  interface GetUserCurriculumsResponse {
    count: number;
    items: (Tables.TCurriculums & {
      groupName: string | undefined;
    })[];
  }

  interface UpdateUserParameter {
    userId: string;
  }

  interface UpdateUserRequest {
    notifications?: string[];
  }

  type UpdateUserResponse = void;
}
