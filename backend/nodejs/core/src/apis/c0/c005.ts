import { Request } from 'express';
import { DBHelper } from '@utils';
import { Words } from '@queries';
import { APIs } from 'typings';
import { GroupService } from '@services';

/** グループ単語削除 */
export default async (req: Request<APIs.C005Params, any, any, any>): Promise<APIs.C005Response> => {
  const params = req.params;

  await DBHelper().transactWrite({
    TransactItems: [
      {
        // 単語情報削除
        Delete: Words.del({ id: params.word, groupId: params.groupId }),
      },
      {
        // グループ単語数更新
        Update: GroupService.minusCountQuery(params.groupId, 1),
      },
    ],
  });
};
