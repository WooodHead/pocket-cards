export namespace Tables {
  interface TUsersKey {
    // ユーザID
    id: string;
  }

  interface TUsers extends TUsersKey {
    // ユーザ名
    name?: string;
    // ユーザ ICon
    icon?: string;
    // メール
    email?: string;
    // // 前回ログイン
    // lastLogin?: string;
    // // 直近ログイン
    // login?: string;
  }

  interface TGroupsKey {
    // グループID
    id: string;
  }

  interface TGroupGSI1Key {
    // グループID
    id: string;
    // ユーザID
    userId: string;
  }

  interface TGroups extends TGroupsKey, TGroupGSI1Key {
    // グループ名
    name?: string;
    // 説明
    description?: string;
    // 単語数
    count?: number;
    // 科目
    subject?: string;
    // index
    index?: number;
  }

  interface TQuestionsKey {
    id: string;
  }

  interface TQuestions extends TQuestionsKey, TQuestionsGSI1Key {
    // グループID
    groupId: string;
    // 問題
    title: string;
    // 問題の説明
    description?: string;
    // 選択肢
    choices?: string[];
    // 回答
    answer: string;
    // 問題音声
    voiceTitle?: string;
    // 回答音声
    voiceAnswer?: string;
    /** @deprecated 次の学習時間 */
    nextTime: string;
    /** @deprecated 最後の学習時間 */
    lastTime?: string;
    /** @deprecated 学習回数 */
    times: number;
  }

  interface TQuestionsGSI1Key {
    // グループID
    groupId: string;
    // 問題ID
    id: string;
  }

  interface TQuestionsGSI1Projection {}

  interface TLearningKey {
    // 問題ID
    qid: string;
  }

  interface TLearning extends TLearningKey {
    // ユーザID
    userId: string;
    // グループID
    groupId: string;
    // 科目_次の学習時間
    subjectNextTime: string;
    // 最後の学習時間
    lastTime?: string;
    // 学習回数
    times: number;
  }

  interface TLearningGSI1Key {
    // ユーザID
    userId: string;
    // 次の学習時間
    subjectNextTime: string;
  }

  interface TLearningGSI1Projection extends TLearningGSI1Key {
    // 問題ID
    qid: string;
  }

  interface TWordsKey {
    // 単語
    id: string;
    // グループID
    groupId: string;
  }

  interface TWords extends TWordsKey {
    // 次の学習時間
    nextTime: string;
    // 最後の学習時間
    lastTime?: string;
    // 学習回数
    times: number;
    // 語彙
    vocabulary?: string;
  }

  export interface TWordMaster {
    // 単語
    id: string;
    // 原型
    original: string;
    // 発音記号
    pronounce?: string;
    // 語彙（中国語）
    vocChn?: string;
    // 語彙（日本語）
    vocJpn?: string;
    // 音声ファイル
    mp3?: string;
  }

  export interface WordIgnoreKey {
    // ユーザID
    id: string;
    // 単語
    word: string;
  }

  export interface TWordIgnore extends WordIgnoreKey {}

  interface GroupsKey {
    // グループID
    id: string;
    // ユーザID
    userId?: string;
  }

  // interface TGroups extends GroupsKey {
  //   // グループ名
  //   name?: string;
  //   // 説明
  //   description?: string;
  //   // 単語数
  //   count: number;
  //   // 科目
  //   subject?: string;
  // }

  interface HistoriesKey {
    // ユーザID
    user: string;
    // Timestamp
    timestamp: string;
  }

  interface THistories extends HistoriesKey {
    // グループID
    group?: string;
    // 単語
    word?: string;
    // 最後の学習時間
    lastTime?: string;
    // 学習回数
    times?: number;
  }
}
