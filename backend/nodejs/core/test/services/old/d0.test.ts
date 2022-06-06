import server from '@src/app';
import request from 'supertest';
import * as D0 from '../../datas/d0';
import { HEADER_AUTH } from '@test/Commons';
import { DynamodbHelper } from '@alphax/dynamodb';
import { Environment } from '@consts';

const client = new DynamodbHelper({ options: { endpoint: process.env['AWS_ENDPOINT_DYNAMODB'] } });

jest.setTimeout(10000);

describe('d0', () => {
  afterEach(async () => {
    await client.truncateAll(Environment.TABLE_NAME_WORD_IGNORE);
    await client.truncateAll(Environment.TABLE_NAME_WORDS);
    await client.truncateAll(Environment.TABLE_NAME_WORD_MASTER);
    await client.truncateAll(Environment.TABLE_NAME_TRACES);
    await client.truncateAll(Environment.TABLE_NAME_GROUPS);
  });

  test.skip('D004:今日のテスト', async () => {
    await client.bulk(Environment.TABLE_NAME_GROUPS, D0.D004DB_GROUP);
    await client.bulk(Environment.TABLE_NAME_WORDS, D0.D004DB_WORDS);
    await client.bulk(Environment.TABLE_NAME_WORD_MASTER, D0.D004DB_WORD_MASTER);

    const apiPath = '/v1/today/test';
    const res = await request(server).get(apiPath).set('username', HEADER_AUTH);

    console.log(res.body);
    console.log(res.statusCode);
  });
});