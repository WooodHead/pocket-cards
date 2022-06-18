import { Tables } from './tables';
import { Request } from 'express';

// ------------------------------------------------------------
// APIs
// ------------------------------------------------------------
export namespace APIs {
  interface BaseResponse {
    statusCode: number;
    headers?: Record<string, string>;
    isBase64Encoded: boolean;
    body?: string;
  }

  type Callback = (req: Request) => Promise<any>;

  interface WordItem {
    // 単語
    id: string;
    // グループID
    groupId: string;
    // 発音記号
    pronounce?: string;
    // 語彙（中国語）
    vocChn?: string;
    // 語彙（日本語）
    vocJpn?: string;
    // 音声ファイル
    mp3?: string;
    // 回数
    times: number;
  }

  // ------------------------------------------------------------
  // A002
  // ------------------------------------------------------------
  interface A002Request {}

  interface A002Response {
    remaining: {
      test: number;
      review: number;
    };
    daily: {
      total: number;
      new: number;
      review: number;
    };
    weekly: number;
    monthly: number;
  }

  // ------------------------------------------------------------
  // B001
  // ------------------------------------------------------------
  interface GroupRegistRequest {
    name: string;
    subject: string;
    description?: string;
  }

  interface GroupRegistResponse {
    groupId: string;
  }

  // ------------------------------------------------------------
  // B002
  // ------------------------------------------------------------
  interface GroupListQuery {
    subject?: string;
  }

  interface GroupListRequest {}

  interface GroupListResponse {
    count: number;
    items: Tables.TGroups[];
  }

  // ------------------------------------------------------------
  // B003
  // ------------------------------------------------------------
  interface GroupDescribeParams {
    groupId: string;
  }

  interface GroupDescribeRequest {}

  interface GroupDescribeResponse {
    item?: Tables.TGroups;
  }

  // ------------------------------------------------------------
  // B004
  // ------------------------------------------------------------
  interface GroupUpdateParams {
    groupId: string;
  }

  interface GroupUpdateRequest {
    name?: string;
    description?: string;
  }

  // ------------------------------------------------------------
  // Group Remove
  // ------------------------------------------------------------
  interface GroupRemoveParams {
    groupId: string;
  }

  type GroupRemoveResponse = void;

  // ------------------------------------------------------------
  // B006
  // ------------------------------------------------------------
  interface B006Params {
    groupId: string;
  }

  interface B006Request {}

  interface B006Response {
    count: number;
    // 学習済み
    learned: number;
    // 未学習
    unlearned: number;
    // 復習
    review: number;
    // 未テスト
    untested: number;
  }

  // ------------------------------------------------------------
  // C001
  // ------------------------------------------------------------
  interface C001Params {
    groupId: string;
  }

  interface C001Request {
    words: string[];
  }

  interface C001Response {}

  // ------------------------------------------------------------
  // C002
  // ------------------------------------------------------------
  interface C002Params {
    groupId: string;
  }

  interface C002ResItem {
    id: string;
    vocabulary?: string;
  }

  interface C002Response {
    count: number;
    items: C002ResItem[];
  }

  // ------------------------------------------------------------
  // C003
  // ------------------------------------------------------------
  interface C003Params {
    groupId: string;
    word: string;
  }

  interface C003Response {
    item?: Tables.TWords;
  }

  // ------------------------------------------------------------
  // C004
  // ------------------------------------------------------------
  interface C004Params {
    groupId: string;
    word: string;
  }

  interface C004Request {
    type: string;
    correct?: boolean;
    times?: number;
    newWord?: string;
  }

  type C004Response = void;

  // ------------------------------------------------------------
  // C005
  // ------------------------------------------------------------
  interface C005Params {
    groupId: string;
    word: string;
  }

  type C005Response = void;

  // ------------------------------------------------------------
  // C006
  // ------------------------------------------------------------
  interface C006Params {
    groupId: string;
  }

  interface C006Response {
    count: number;
    words: WordItem[];
  }
  // ------------------------------------------------------------
  // C007
  // ------------------------------------------------------------
  interface C007Params {
    groupId: string;
  }

  interface C007Response {
    count: number;
    words: WordItem[];
  }
  // ------------------------------------------------------------
  // C008
  // ------------------------------------------------------------
  interface C008Params {
    groupId: string;
  }

  interface C008Response {
    count: number;
    words: WordItem[];
  }
  // ------------------------------------------------------------
  // D001
  // ------------------------------------------------------------
  interface D001Request {
    content: string;
    language?: string;
  }

  interface D001Response {
    count: number;
    words: string[];
  }

  // ------------------------------------------------------------
  // D003
  // ------------------------------------------------------------
  interface D003Request {
    word: string;
  }

  type D003Response = void;

  // ------------------------------------------------------------
  // D004
  // ------------------------------------------------------------
  interface D004Request {}

  type D004Response = {
    count: number;
    words: WordItem[];
  };

  // ------------------------------------------------------------
  // D005
  // ------------------------------------------------------------
  interface D005Request {}

  type D005Response = {
    count: number;
    words: WordItem[];
  };

  // ------------------------------------------------------------
  // D006
  // ------------------------------------------------------------
  interface D006Request {}

  type D006Response = {
    count: number;
    words: WordItem[];
  };

  // ------------------------------------------------------------
  // E001
  // ------------------------------------------------------------
  interface E001Params {
    word: string;
  }

  interface E001Response {
    item?: Tables.TWordMaster;
  }

  // ------------------------------------------------------------
  // E002
  // ------------------------------------------------------------
  interface E002Params {
    word: string;
  }

  interface E002Request extends Tables.TWordMaster {}

  type E002Response = Tables.TWordMaster;

  // ------------------------------------------------------------
  // Question Regist
  // ------------------------------------------------------------
  interface QuestionRegistParams {
    groupId: string;
  }

  interface QuestionRegistRequest {
    questions: string[];
  }

  interface QuestionRegistResponse {
    count: number;
    ids: string[];
  }

  // ------------------------------------------------------------
  // Question Delete
  // ------------------------------------------------------------
  interface QuestionDeleteParams {
    groupId: string;
    questionId: string;
  }

  interface QuestionDeleteRequest {}

  type QuestionDeleteResponse = void;

  // ------------------------------------------------------------
  // Question Daily Study
  // ------------------------------------------------------------
  interface QuestionStudyRequest {}

  interface QuestionStudyResponse {
    count: number;
    questions: Tables.TQuestions[];
  }

  interface QuestionStudyQuery {
    subject?: string;
  }

  // ------------------------------------------------------------
  // Question Daily Test
  // ------------------------------------------------------------
  interface QuestionTestRequest {}

  interface QuestionTestQuery {
    subject?: string;
  }

  interface QuestionTestResponse {
    count: number;
    questions: Tables.TQuestions[];
  }

  // ------------------------------------------------------------
  // Question Daily Review
  // ------------------------------------------------------------
  interface QuestionReviewRequest {}

  interface QuestionReviewQuery {
    subject?: string;
  }

  interface QuestionReviewResponse {
    count: number;
    questions: Tables.TQuestions[];
  }

  // ------------------------------------------------------------
  // Question Answer
  // ------------------------------------------------------------
  interface QuestionAnswerParams {
    questionId: string;
  }

  interface QuestionAnswerRequest {
    correct?: string;
  }

  type QuestionAnswerResponse = void;

  // ------------------------------------------------------------
  // Question List
  // ------------------------------------------------------------
  interface QuestionListParams {
    groupId: string;
  }

  interface QuestionListRequest {}

  interface QuestionListResponse {
    count: number;
    questions: Tables.TQuestions[];
  }

  // ------------------------------------------------------------
  // Question Update
  // ------------------------------------------------------------
  interface QuestionUpdateParams {
    groupId: string;
    questionId: string;
  }

  interface QuestionUpdateRequest {
    title: string;
    choices?: string;
    answer: string;
    description?: string;
  }

  type QuestionUpdateResponse = Tables.TQuestions;

  // ------------------------------------------------------------
  // Question Ignore
  // ------------------------------------------------------------
  interface QuestionIgnoreParams {
    groupId: string;
    questionId: string;
  }

  interface QuestionIgnoreRequest {}

  type QuestionIgnoreResponse = void;

  // ------------------------------------------------------------
  // Curriculum Ignore
  // ------------------------------------------------------------
  interface CurriculumIgnoreParams {
    curriculumId: string;
    questionId: string;
  }

  interface CurriculumIgnoreRequest {}

  type CurriculumIgnoreResponse = void;

  // ------------------------------------------------------------
  // Weekly Ability Regist
  // ------------------------------------------------------------
  interface WeeklyAbilityRegistRequest {
    name: string;
    subject: string;
    student: string;
    groupIds?: string[];
  }

  interface WeeklyAbilityRegistResponse {
    item: Tables.TGroups;
  }

  // ------------------------------------------------------------
  // Weekly Test List
  // ------------------------------------------------------------
  interface WeeklyTestListParameter {
    groupId: string;
  }

  interface WeeklyTestListQuery {
    reset?: string;
  }

  interface WeeklyTestListRequest {}

  interface WeeklyTestListResponse {
    count: number;
    questions: Tables.TQuestions[];
  }

  // ------------------------------------------------------------
  // Weekly Ability Answer
  // ------------------------------------------------------------
  interface WeeklyAbilityAnswerParameter {
    questionId: string;
    groupId: string;
  }

  interface WeeklyAbilityAnswerRequest {
    mode: string;
    correct?: string;
  }

  type WeeklyAbilityAnswerResponse = void;
  // ------------------------------------------------------------
  // Reports - Daily Tasks
  // ------------------------------------------------------------
  interface DailyTasksResquest {}

  interface DailyTasksResponse {
    language: {
      archive: number;
      target: number;
    };
    society: {
      archive: number;
      target: number;
    };
    science: {
      archive: number;
      target: number;
    };
    maths: {
      archive: number;
      target: number;
    };
  }

  // ------------------------------------------------------------
  // Reports - Leaning Progress
  // ------------------------------------------------------------
  interface LearningProgressRequest {}

  interface LearningProgressResponse {
    histories: {
      timestamp: string;
      japanese?: number;
      science?: number;
      society?: number;
    }[];
  }

  // ------------------------------------------------------------
  // Reports - Leaning Overall
  // ------------------------------------------------------------
  interface LearningOverallRequest {}

  interface LearningOverallResponse {
    language: _.Dictionary<number>;
    science: _.Dictionary<number>;
    society: _.Dictionary<number>;
    maths: _.Dictionary<number>;
  }

  // ------------------------------------------------------------
  // Reports - Inquiry
  // ------------------------------------------------------------
  interface InquiryResquest {
    id: string;
  }

  type InquiryResponse = void;

  // ------------------------------------------------------------
  // Curriculums - Curriculum Regist
  // ------------------------------------------------------------
  interface CurriculumRegistRequest {
    userId: string;
    groupId: string;
  }

  type CurriculumRegistResponse = Tables.TCurriculums;

  // ------------------------------------------------------------
  // Curriculums - Curriculum Describe
  // ------------------------------------------------------------
  interface CurriculumDescribeRequest {}

  interface CurriculumDescribeResponse {}

  // ------------------------------------------------------------
  // Curriculums - Curriculum Remove
  // ------------------------------------------------------------
  interface CurriculumRemoveParams {
    curriculumId: string;
  }

  type CurriculumRemoveRequest = void;

  type CurriculumRemoveResponse = void;

  // ------------------------------------------------------------
  // Curriculums - Curriculum Order Update
  // ------------------------------------------------------------
  interface CurriculumOrderParams {
    curriculumId: string;
  }

  interface CurriculumOrderRequest {
    order: string;
  }

  type CurriculumOrderResponse = Tables.TCurriculums;

  // ------------------------------------------------------------
  // Curriculums - Curriculum Lists
  // ------------------------------------------------------------
  interface CurriculumListsQuery {
    subject?: string;
  }

  interface CurriculumListsRequest {}

  interface CurriculumListsResponse {
    count: number;
    items: Tables.TCurriculums[];
  }

  interface CurriculumQuestionsParams {
    curriculumId: string;
  }

  interface CurriculumQuestionsRequest {}

  interface CurriculumQuestionsResponse {
    count: number;
    items: Tables.TQuestions[];
  }
}
