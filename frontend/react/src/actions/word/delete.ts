import { defaultFailure, defaultRequest } from '@actions';
import { ActionTypes, Consts, Paths } from '@constants';
import { push } from 'connected-react-router';
import { createAction } from 'redux-actions';
import { API, APP } from 'typings';

export const success = createAction<APP.E008Payload, string, string>(
  ActionTypes.E0_08_SUCCESS,
  (groupId: string, word: string) => ({
    groupId,
    word,
  })
);

/** 単語削除 */
const del: APP.WordDeleteAction = (groupId: string, word: string) => async (dispatch, _, api) => {
  // 単語削除開始イベント
  dispatch(defaultRequest());

  try {
    await api.del<API.C005Response>(Consts.C005_URL(groupId, word));

    // データ保存
    dispatch(success(groupId, word));
    // 画面遷移
    dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Study]));
  } catch (err) {
    dispatch(defaultFailure(err));
  }
};

export default del;
