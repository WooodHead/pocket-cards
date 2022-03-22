import { DynamoDB } from 'aws-sdk';
import { Environment } from '@consts';
import { Tables } from 'typings';
export * as query from './query';

/** データ取得 */
export const get = (key: Tables.TracesKey): DynamoDB.DocumentClient.GetItemInput => ({
  TableName: Environment.TABLE_NAME_TRACES,
  Key: key,
});

/** データ登録 */
export const put = (item: Tables.TTraces) =>
  ({
    TableName: Environment.TABLE_NAME_TRACES,
    Item: item,
  } as DynamoDB.DocumentClient.PutItemInput);
