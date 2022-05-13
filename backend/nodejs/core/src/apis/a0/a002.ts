import { Request } from 'express';
import moment from 'moment';
import { APIs, Tables } from 'typings';
import { DBHelper, DateUtils, Commons } from '@utils';
import { Traces, Words } from '@queries';
import { GroupService } from '@services';

// 環境変数
const TIMESTAMP_ENDFIX = '000000000';

export default async (req: Request): Promise<APIs.A002Response> => {
  if (!req.params) {
    return EmptyResponse();
  }

  const userId = Commons.getUserId(req);
  // 日次
  const day1 = `${moment().format('YYYYMMDD')}${TIMESTAMP_ENDFIX}`;
  // 週次
  const day2 = `${moment().add(-1, 'weeks').format('YYYYMMDD')}${TIMESTAMP_ENDFIX}`;
  // 月次
  const day3 = `${moment().add(-1, 'months').format('YYYYMMDD')}${TIMESTAMP_ENDFIX}`;

  const results = await DBHelper().query<Tables.TTraces>(Traces.query.byUserId(userId, `${day3}`));
  const items = results.Items;

  // 検索結果なし
  if (items.length === 0) {
    return EmptyResponse();
  }

  const daily = items.filter((item) => item.timestamp >= day1);
  const dailyReview = daily.filter((item) => item.timesAfter === 1 && item.lastTime);
  const dailyNew = daily.filter((item) => item.timesAfter === 1 && !item.lastTime);
  const weekly = items.filter((item) => item.timestamp >= day2).length;
  const monthly = items.filter((item) => item.timestamp >= day3).length;

  const remaining = await queryRemaining(userId);

  return {
    remaining,
    daily: {
      total: daily.length,
      new: dailyNew.length,
      review: dailyReview.length,
    },
    weekly,
    monthly,
  };
};

/** 残単語数を計算する */
const queryRemaining = async (userId: string) => {
  let test = 0;
  let review = 0;

  // ユーザのグループ一覧を取得する
  const userInfo = await GroupService.listGroupsByUserId(userId);

  // 検索失敗
  if (!userInfo) {
    return { test, review };
  }

  // グループごと検索する
  for (let idx = 0; idx < userInfo.length; idx = idx + 1) {
    const item = userInfo[idx];

    // not exists to continue
    if (!item) continue;

    // group id
    const groupId = item.id;

    // 件数検索
    let result = await DBHelper().query(Words.query.queryByDate(groupId, DateUtils.getNow()));

    // 検索成功の場合
    if (result.Count) {
      // 件数を統計する
      test = test + result.Count;
    }

    // 件数検索
    result = await DBHelper().query(Words.query.queryByGroupId02(groupId, DateUtils.getNow()));

    // 検索成功の場合
    if (result.Count) {
      // 件数を統計する
      review = review + result.Count;
    }
  }

  return {
    test,
    review,
  };
};

const EmptyResponse = (): APIs.A002Response => ({
  remaining: {
    review: 0,
    test: 0,
  },
  daily: {
    new: 0,
    review: 0,
    total: 0,
  },
  monthly: 0,
  weekly: 0,
});