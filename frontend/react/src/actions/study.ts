import { push } from 'connected-react-router';
import { withLoading } from '@actions';
import { Consts, Paths } from '@constants';
import { Actions } from '@reducers';
import { API } from '@utils';
import { APIs, AppDispatch, RootState } from 'typings';

/** テスト回答(YES/NO) */
export const answer = (word: string, yes: boolean) => (dispatch: AppDispatch) =>
  dispatch(
    withLoading(async (state: RootState) => {
      const { mode, current, rows } = state.study;
      const { activeGroup } = state.group;

      // 復習モードの場合、サーバ更新しない
      if (mode === Consts.MODES.Review) {
        dispatch(Actions.STUDY_ANSWER(yes));
        return;
      }

      // 新規学習モードの場合、不正解の場合、更新しない
      if (mode === Consts.MODES.New && !yes) {
        dispatch(Actions.STUDY_ANSWER(yes));
        return;
      }

      // データなしの場合、処理しない
      if (!current) return;

      // 正解の場合、現在の回数、不正解の場合は0に戻ります
      const times = yes ? current.times : 0;

      // 単語状態を設定する
      updateStatus(activeGroup, word, yes, times);
      // Client状態管理
      dispatch(Actions.STUDY_ANSWER(yes));

      // 一定数以上の場合、再取得しない
      if (rows.length > 4) {
        return;
      }

      // 0.1秒待ち
      await sleep(100);

      // 新規の場合
      if (mode === Consts.MODES.New) {
        // 新規単語の追加
        dispatch(Actions.STUDY_CONTINUE(Consts.MODES.New));
      } else {
        // テストの場合
        dispatch(Actions.STUDY_CONTINUE(Consts.MODES.AllTest));
      }
    })
  );

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

const updateStatus = async (groupId: string, word: string, yes: boolean, times: number) => {
  await API.put(Consts.C004_URL(groupId, word), {
    type: '1',
    correct: yes,
    times,
  } as APIs.C004Request);
};

/** 新規単語学習 */
export const startNew = () => (dispatch: AppDispatch) =>
  dispatch(
    withLoading(async () => {
      // 画面遷移
      dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.StudyCard]));
      // 新規単語の学習開始
      dispatch(Actions.STUDY_START(Consts.MODES.New));
    })
  );

/** 単語復習 */
export const startReview = () => (dispatch: AppDispatch) =>
  dispatch(
    withLoading(async () => {
      // 画面遷移
      dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.StudyCard]));
      // 復習単語の学習開始
      dispatch(Actions.STUDY_START(Consts.MODES.Review));
    })
  );

/** 単語テスト */
export const startTest = () => (dispatch: AppDispatch) =>
  dispatch(
    withLoading(async () => {
      // 画面遷移
      dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.StudyCard]));
      // テスト単語の学習開始
      dispatch(Actions.STUDY_START(Consts.MODES.AllTest));
    })
  );
