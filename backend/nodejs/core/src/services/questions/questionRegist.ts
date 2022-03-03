import { Request } from 'express';
import { generate } from 'short-uuid';
import { Commons, DBHelper } from '@utils';
import { Groups, Questions } from '@queries';
import { APIs, Tables } from 'typings';

/** 国語単語追加 */
export default async (req: Request<APIs.QuestionRegistParams, any, APIs.QuestionRegistRequest, any>): Promise<void> => {
  const input = req.body;
  const groupId = req.params.groupId;
  const userId = Commons.getUserId(req);

  // ユーザのグループID 一覧
  const userGroups = await DBHelper().query<Tables.TGroups>(Groups.query.byUserId(userId));
  const groupInfo = userGroups.Items.find((item) => item.id === groupId && item.userId === userId);

  // group not users
  if (!groupInfo) {
    throw new Error(`Group is not exist. ${groupId}`);
  }

  // regist
  const tasks = input.questions.map((item) => {
    const items = item.split(',');
    const q: Tables.TQuestion = {
      id: generate(),
      groupId: groupId,
      title: items[0],
      description: items[1],
      choices: items[2].split('|'),
      answer: items[3],
      times: 0,
      nextTime: '19000101',
      lastTime: '19000101',
    };

    return DBHelper().put(Questions.put(q));
  });

  await Promise.all(tasks);
};