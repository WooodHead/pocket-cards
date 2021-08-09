import { DynamodbHelper } from '@alphax/dynamodb';
import axios, { AxiosStatic } from 'axios';
import request from 'supertest';
import { Groups, Words } from '@queries';
import { Environment } from '@consts';
import { DateUtils } from '@utils';
import server from '@src/app';
import * as C0 from '../datas/c0';
import { HEADER_AUTH } from '@test/Commons';

jest.mock('axios');
const api = axios as jest.Mocked<AxiosStatic>;

const client = new DynamodbHelper({ options: { endpoint: process.env.AWS_ENDPOINT } });

describe('C0', () => {
  afterEach(async () => {
    await client.truncateAll(Environment.TABLE_NAME_WORDS);
    await client.truncateAll(Environment.TABLE_NAME_WORD_MASTER);
    await client.truncateAll(Environment.TABLE_NAME_HISTORIES);
    await client.truncateAll(Environment.TABLE_NAME_GROUPS);
  });

  test.skip('C001:単語新規追加(複数)', async () => {
    // const user: User.GetUserResponse = require('./expect/Decode.json');
    // api.get.mockResolvedValueOnce({ status: 200, data: user });

    const res = await request(server)
      .post('/groups/group001/words')
      .set('authorization', HEADER_AUTH)
      .send(C0.C001Req01);

    // status code
    expect(res.statusCode).toBe(200);

    console.log(res.body);
  });

  test.skip('C001:単語新規追加(1つ)', async () => {
    const res = await request(server)
      .post('/groups/group001/words')
      .set('authorization', HEADER_AUTH)
      .send(C0.C001Req02);

    // status code
    expect(res.statusCode).toBe(200);

    console.log(res.body);
  });

  test('C002:グループ単語一覧_データあり', async () => {
    await client.bulk(Environment.TABLE_NAME_WORDS, C0.C002DB01);

    const res = await request(server).get('/groups/C002/words').set('authorization', HEADER_AUTH);

    // status code
    expect(res.statusCode).toBe(200);
    // found 2 records
    expect(res.body).toEqual(C0.C002Res01);
  });

  test('C002:グループ単語一覧_データなし', async () => {
    const res = await request(server).get('/groups/C003/words').set('authorization', HEADER_AUTH);

    // status code
    expect(res.statusCode).toBe(200);
    // found 2 records
    expect(res.body).toEqual(C0.C002Res02);
  });

  test('C003:単語詳細取得', async () => {
    await client.bulk(Environment.TABLE_NAME_WORDS, C0.C003DB01);

    const res = await request(server).get('/groups/C003/words/C003-1').set('authorization', HEADER_AUTH).expect(200);

    // response
    expect(res.body).toEqual(C0.C003Res01);
  });

  test('C004_001:学習成功', async () => {
    await client.bulk(Environment.TABLE_NAME_WORDS, C0.C004DB01);

    await request(server)
      .put('/groups/C004/words/WORD-4')
      .set('authorization', HEADER_AUTH)
      .send(C0.C004Req01)
      .expect(200);

    const wordItem = (await client.get(Words.get({ id: 'WORD-4', groupId: 'C004' })))?.Item;
    const historyItem = await (await client.scan({ TableName: Environment.TABLE_NAME_HISTORIES })).Items[0];

    const expectWord = C0.C004Res01_Word;
    // @ts-ignore
    expectWord.lastTime = DateUtils.getNow();
    // @ts-ignore
    expectWord.nextTime = DateUtils.getNextTime(2);

    // found 2 records
    expect(wordItem).toEqual(expectWord);
    expect(historyItem).toMatchObject(C0.C004Res01_History);
  });

  test('C004_002:学習失敗', async () => {
    await client.bulk(Environment.TABLE_NAME_WORDS, C0.C004DB02);

    await request(server)
      .put('/groups/C004/words/WORD-4')
      .set('authorization', HEADER_AUTH)
      .send(C0.C004Req02)
      .expect(200);

    const wordItem = (await client.get(Words.get({ id: 'WORD-4', groupId: 'C004' })))?.Item;
    const historyItem = (await client.scan({ TableName: Environment.TABLE_NAME_HISTORIES })).Items[0];

    const expectWord = C0.C004Res02_Word;
    // @ts-ignore
    expectWord.lastTime = DateUtils.getNow();
    // @ts-ignore
    expectWord.nextTime = DateUtils.getNow();

    expect(wordItem).toEqual(expectWord);
    expect(historyItem).toMatchObject(C0.C004Res02_History);
  });

  test('C004_003:単語情報更新_既存単語あり', async () => {
    await client.bulk(Environment.TABLE_NAME_WORDS, C0.C004DB03);

    const res = await request(server)
      .put('/groups/C004/words/WORD4')
      .set('authorization', HEADER_AUTH)
      .send(C0.C004Req03);

    // status code
    expect(res.statusCode).toBe(200);
  });

  test('C004_004:単語情報更新_単語更新', async () => {
    await client.bulk(Environment.TABLE_NAME_WORDS, C0.C004DB04);

    const res = await request(server)
      .put('/groups/C004/words/WORD4')
      .set('authorization', HEADER_AUTH)
      .send(C0.C004Req04);

    // status code
    expect(res.statusCode).toBe(200);
  });

  test('C005:グループ単語削除', async () => {
    await client.bulk(Environment.TABLE_NAME_GROUPS, C0.C005DB01_Group);
    await client.bulk(Environment.TABLE_NAME_WORDS, C0.C005DB01_Word);

    const apiPath = '/groups/C005/words/C005-1';
    const res = await request(server).delete(apiPath).set('authorization', HEADER_AUTH);

    // status code
    expect(res.statusCode).toBe(200);
    // found 2 records
    const group = await client.get(Groups.get({ id: 'C005', userId: '84d95083-9ee8-4187-b6e7-8123558ef2c1' }));
    const word = await client.get(Words.get({ id: 'C005-1', groupId: 'C005' }));

    expect(group).toEqual(C0.C005Except);
    expect(word).toBeUndefined;
  });

  test('C006:新規学習あり', async () => {
    await client.bulk(Environment.TABLE_NAME_WORDS, C0.C006DB01_WORD);
    await client.bulk(Environment.TABLE_NAME_WORD_MASTER, C0.C006DB01_WORD_MASTER);

    const apiPath = '/groups/C006/new';
    const res = await request(server).get(apiPath).set('authorization', HEADER_AUTH);

    // status code
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(C0.C006Res01);
  });

  test('C006:新規学習なし', async () => {
    const apiPath = '/groups/C006/new';
    const res = await request(server).get(apiPath).set('authorization', HEADER_AUTH);

    // status code
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(C0.C006Res02);
  });

  //     const URL = '/groups/C006/new';
  //     const res = await chai.request(server).get(URL).set('authorization', HEADER_AUTH).send();

  //     chai.expect(res.status).to.be.eq(200);
  //     chai.expect(res.body).to.be.deep.equals(require('./datas/res001.json'));

  // test('b002: empty list', async () => {
  //   const res = await request(server).get('/groups').set('authorization', HEADER_AUTH);

  //   // status code
  //   expect(res.statusCode).toBe(200);
  //   // found 2 records
  //   expect(res.body).toEqual(B0.B002Res02);
  // });

  // test('b003', async () => {
  //   // initialize table
  //   await client.bulk(TABLE_NAME_GROUPS, B0.B003DB);

  //   const res = await request(server).get('/groups/B003').set('authorization', HEADER_AUTH);

  //   // status code
  //   expect(res.statusCode).toBe(200);
  //   // found 2 records
  //   expect(res.body).toEqual(B0.B003Res01);
  // });

  // test('b004', async () => {
  //   // initialize table
  //   await client.bulk(TABLE_NAME_GROUPS, B0.B004DB01);

  //   // api call
  //   const res = await request(server).put('/groups/B004').set('authorization', HEADER_AUTH).send(B0.B004Req01);

  //   // database
  //   const result = await DBHelper().get(Groups.get({ id: 'B004', userId: 'B004' }));
  //   // status code
  //   expect(res.statusCode).toBe(200);
  //   // found 2 records
  //   expect(result?.Item).toEqual(B0.B004Res01);
  // });

  // test('b005', async () => {
  //   // initialize table
  //   await client.bulk(TABLE_NAME_GROUPS, B0.B005DB01);

  //   // api call
  //   const res = await request(server).delete('/groups/B005').set('authorization', HEADER_AUTH).send(B0.B004Req01);

  //   // database
  //   const userId = Commons.getUserInfo(HEADER_AUTH);
  //   const result = await DBHelper().get(Groups.get({ id: 'B005', userId: userId }));
  //   // status code
  //   expect(res.statusCode).toBe(200);
  //   // database
  //   expect(result?.Item).toBeUndefined();
  // });
});
