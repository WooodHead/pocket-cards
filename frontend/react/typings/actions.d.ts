import { CognitoUser } from '@aws-amplify/auth';
import { APIs, ReduxAction0, ReduxAction2, ReduxAction3, ReduxAction1, App, Tables } from '.';

/** 画像アップロード */
export interface UploadImagePayload {
  data: APIs.D001Response;
}

export type UploadImageAction = ReduxAction1<string, UploadImagePayload>;

/** 指定単語削除 */
export interface RegistRemovePayload {
  word: string;
}

export type RemoveWordAction = ReduxAction1<string, RegistRemovePayload>;

/** 単語登録 */
export type RegistWordsAction = ReduxAction1<string[], void, Promise<void>>;

/** 単語クリア */
export type ClearAction = ReduxAction0<void>;

// ######################################################################
// APP Actions
// ######################################################################
/** Start/End Loading */
export interface LoadingPayload {
  isLoading: boolean;
}

export type LoadingAction = ReduxAction1<boolean, LoadingPayload>;

/** Tab Change */
export interface TabChangePayload {
  index: number;
}

export type TabChangeAction = ReduxAction1<number, TabChangePayload>;

/** ログイン状態変更 */
export interface LoggedInPayload {
  user: CognitoUser;
}
export type LoggedInAction = ReduxAction1<CognitoUser, LoggedInPayload>;

/** ログアウト */
export type LogoutAction = ReduxAction0;

/** サーバ開始 */
export interface ServerStartPayload {
  status: string;
}

export type ServerStartAction = ReduxAction0<ServerStartPayload>;

/** サーバ終了 */
export interface ServerStopPayload {
  status: string;
}

export type ServerStopAction = ReduxAction0<ServerStopPayload>;

/** サーバステータス */
export interface ServerStatusPayload {
  status: string;
}

export type ServerStatusAction = ReduxAction0<ServerStatusPayload>;

/** グループ選択 */
export interface App09Payload {
  groupId: string;
}

export type GroupSelectAction = ReduxAction1<string, App09Payload>;

/** 表示フラグ制御 */
export interface App10Payload {
  type: number;
  value: boolean;
}

export type ShowAction = ReduxAction2<number, boolean, App10Payload>;

// ######################################################################
// Group Actions
// ######################################################################

/** Group Regist */
export type B001Payload = Tables.TGroups;
export type GroupRegistAction = ReduxAction2<string, string | undefined, B001Payload>;

/** Group List */
export type B002Payload = APIs.B002Response;
export type GroupListAction = ReduxAction0<B002Payload>;

/** Group Delete */
export type B005Payload = {
  groupId: string;
};
export type GroupDeleteAction = ReduxAction0<B005Payload>;

/** Group Edit */
export type B004Payload = void;
export type GroupEditAction = ReduxAction1<App.GroupInfo, B004Payload>;

// ######################################################################
// Word Actions
// ######################################################################

/** Word List */
export type E005Payload = {
  groupId: string;
  words: APIs.C002Response;
};

export type WordListAction = ReduxAction1<string, E005Payload, Promise<void>>;

/** Word Details */
export type E006Payload = {
  res: APIs.E001Response;
};

export type WordDetailAction = ReduxAction1<string, E006Payload, Promise<void>>;

/** Word Delete */
export type E008Payload = {
  groupId: string;
  word: string;
};

export type WordDeleteAction = ReduxAction2<string, string, E008Payload, Promise<void>>;

export interface B001Payload {
  mode: string;
  words: WordItem[];
}

export type StartNewAction = ReduxAction0<B001Payload>;

export interface B004Payload {
  yes: boolean;
}

export type AnswerAction = ReduxAction2<string, boolean, B004Payload, Promise<void>> | ReduxAction0<B001Payload>;

export interface B006Payload {
  mode: string;
  words: APIs.WordItem[];
}
export type StartReviewAction = ReduxAction0<B006Payload, Promise<void>>;

export interface B007Payload {
  mode: string;
  words: APIs.WordItem[];
}

export type StartTestAction = ReduxAction0<B007Payload>;
