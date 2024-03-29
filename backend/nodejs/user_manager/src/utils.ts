import { DynamodbHelper } from '@alphax/dynamodb';
import { Environments } from '@consts';
import express from 'express';
import { decode } from 'jsonwebtoken';
import { defaultTo } from 'lodash';
import { Tables } from 'typings';
import winston from 'winston';

export const DBHelper = new DynamodbHelper({ options: { endpoint: process.env.AWS_ENDPOINT } });

export const Logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {
    service: 'user-service',
  },
  transports: [new winston.transports.Console({ level: 'debug' })],
});

// /** catch undefined errors */
export const common = async (req: express.Request, res: express.Response, app: any) => {
  Logger.info('request', req.body);

  try {
    const results = await app(req, res);

    Logger.info('response', results);

    res.status(200).send(results);
  } catch (err) {
    Logger.error('unhandled error:', err);

    const message = defaultTo((err as any).response?.data, (err as any).message);

    res.status(500).send(message);
  }
};

/**
 * Header情報からUserIdを取得する(Cognito Authorization IdToken)
 *
 * @param authKey Header Key
 */
export const getUserId = (req: express.Request<any, any, any, any>, authKey: string = 'username') => {
  const value = req.headers[authKey] as string;

  // データが存在しない場合、エラーとする
  if (!value) {
    throw new Error('Can not found User Id.');
  }

  return value;
  // return getUserInfo(value);
};

export const getUserInfo = (token: string) => {
  try {
    const jwt = decode(token, { complete: true });

    //@ts-ignore
    return jwt?.payload['cognito:username'];
  } catch (err) {
    Logger.error(err);
    return null;
  }
};

export const getSettings = async (id: string = 'TENANT_USER') => {
  const settings = await DBHelper.get<Tables.TSettingsCognito>({
    TableName: Environments.TABLE_NAME_SETTINGS,
    Key: { id: id } as Tables.TSettingsKey,
  });

  const item = settings?.Item;

  // data not found
  if (!item) {
    throw new Error('Cannot find cognito settings');
  }

  return item;
};
