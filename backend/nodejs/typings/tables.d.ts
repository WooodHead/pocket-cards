export namespace Tables {
  interface TQuestionKey {
    id: string;
    groupId: string;
  }

  interface TQuestion extends TQuestionKey {
    // 問題
    title: string;
    // 問題の説明
    description: string;
    // 選択肢
    choices: string[];
    // 回答
    answer?: string;
    // 次の学習時間
    nextTime: string;
    // 最後の学習時間
    lastTime?: string;
    // 学習回数
    times: number;
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

  interface TUsers {
    // ユーザID
    id: string;
    // ユーザ名
    name?: string;
    // ユーザ ICon
    icon?: string;
    // メール
    email?: string;
    // 前回ログイン
    lastLogin?: string;
    // 直近ログイン
    login?: string;
    // 最後の学習日付
    studyQuery?: string;
  }

  interface GroupsKey {
    // グループID
    id: string;
    // ユーザID
    userId?: string;
  }

  interface TGroups extends GroupsKey {
    // グループ名
    name?: string;
    // 説明
    description?: string;
    // 単語数
    count: number;
    // 科目
    subject: string;
  }

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
