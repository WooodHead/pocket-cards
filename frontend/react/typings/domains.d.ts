import { CognitoUser } from '@aws-amplify/auth';
import { APIs } from '.';

export namespace Domains {
  interface State {
    // App共通設定
    app: App;
    group: Group;
    word: Word;
    user: User;
  }

  interface App {
    tabIndex: number;
    isLoading: boolean;
    user: CognitoUser | undefined;
    groupId: string;
    status: string;
    displayCtrl: { [key: number]: boolean };
  }

  interface Group {
    rows: GroupInfo[];
    // words: GroupWordsItem[];
    // isLoading: boolean;
    // wordDetail?: E001Response;
  }

  interface User {
    remainingTest: number;
    remainingReview: number;
    daily: number;
    dailyNew: number;
    dailyReview: number;
    weekly: number;
    monthly: number;
  }

  interface Word {
    current?: APIs.WordItem;
    mode?: string;
    rows: APIs.WordItem[];
    history: APIs.WordItem[];
    index: number;
  }
}
