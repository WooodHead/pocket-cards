import { APIs, Tables, App, Group } from '.';

export namespace Domains {
  interface AppState {
    // message type
    severity?: 'success' | 'info' | 'warning' | 'error';
    // message
    message?: string;
    // stack open flag
    showSnackbar: boolean;
    // tab index
    tabIndex: number;
    // loading
    isLoading: boolean;
    // server status
    status: string;
    // display control
    displayCtrl: Record<number, boolean>;
  }

  interface GroupState {
    // search word
    searchWord: string;
    // active group
    activeGroup: string;
    /** user's all group infomations */
    groups: Tables.TGroups[];
    /** Group word list */
    groupWords: Group.GroupWords;
    /** Group word list */
    regists: string[];
    /** word detail */
    current?: Group.WordDetails;
    /** group learn status */
    status?: Group.Status;
  }

  interface UserState {
    // 0: not login, 1: new password, 2: logined
    loginStatus: number;
    // username
    username: string;
    // Tokens
    tokens: {
      idToken?: string;
      accessToken?: string;
      refreshToken?: string;
    };
    // details?: User.Details;
    // remainingTest: number;
    // remainingReview: number;
    // daily: number;
    // dailyNew: number;
    // dailyReview: number;
    // weekly: number;
    // monthly: number;
  }

  interface StudyState {
    current?: Group.WordItem;
    mode: string;
    rows: Group.WordItem[];
    history: Group.WordItem[];
    index: number;
  }
}
