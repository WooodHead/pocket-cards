import { defaultFailure, startLoading } from '@actions';
import { ActionTypes, Consts } from '@constants';
import { createAction } from 'redux-actions';
import { API, Actions } from 'typings';

export const success = createAction<Actions.E008Payload, string, string>(
  ActionTypes.E0_08_SUCCESS,
  (groupId: string, word: string) => ({
    groupId,
    word,
  })
);

/** 単語削除 */
const deleteRow: Actions.WordDeleteAction = (groupId: string, word: string) => async (dispatch, _, api) => {
  // 単語削除開始イベント
  dispatch(startLoading());

  try {
    // データ保存
    dispatch(success(groupId, word));

    await api.del<API.C005Response>(Consts.C005_URL(groupId, word));
  } catch (err) {
    dispatch(defaultFailure(err));
  }
};

export default deleteRow;
