import { withLoading } from '@actions';
import { Consts, Paths } from '@constants';
import { Actions } from '@reducers';
import { API } from '@utils';
import { push } from 'connected-react-router';
import { APIs, AppDispatch, Group, RootState } from 'typings';

/** 単語削除 */
export const del = (groupId: string, word: string) => (dispatch: AppDispatch) =>
  dispatch(
    withLoading(async () => {
      // 画面遷移
      dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Study]));

      await API.del<APIs.C005Response>(Consts.C005_URL(groupId, word));

      // データ保存
      dispatch(
        Actions.GROUP_WORD_REMOVE({
          id: groupId,
          word,
        })
      );
    })
  );

/** 単語削除 */
export const deleteRow = (groupId: string, word: string) => (dispatch: AppDispatch) =>
  dispatch(
    withLoading(async () => {
      // データ保存
      dispatch(
        Actions.GROUP_WORD_REMOVE({
          id: groupId,
          word: word,
        })
      );
    })
  );

/** 単語詳細 */
export const detail = (word: string) => (dispatch: AppDispatch) =>
  dispatch(
    withLoading(async () => {
      // 単語詳細画面へ遷移する
      const prefix = Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.StudyEdit].split(':')[0];
      // dispatch screen
      dispatch(push(`${prefix}${word}`));
      // get word detail
      dispatch(Actions.GROUP_WORD_DETAILS(word));
    })
  );

/** Get words list in group */
export const list = () => (dispatch: AppDispatch) =>
  dispatch(
    withLoading(async () => {
      // データ保存
      dispatch(Actions.GROUP_LIST());
    })
  );

export const update = (id: string, infos: Group.WordDetails) => (dispatch: AppDispatch) =>
  dispatch(
    withLoading(async (state: RootState) => {
      const { activeGroup } = state.group;

      const res = await API.put<APIs.E002Response>(Consts.E002_URL(id), {
        id: infos.id,
        pronounce: infos.pronounce,
        vocChn: infos.vocChn,
        vocJpn: infos.vocJpn,
      } as APIs.E002Request);

      // 単語変更された
      if (id !== infos.id) {
        // remove old word from group
        await API.del<APIs.C005Response>(Consts.C005_URL(activeGroup, id));
        // add new word to group
        await API.post<APIs.C001Request, APIs.C001Response>(Consts.C001_URL(activeGroup), {
          words: [infos.id],
        });

        const payload = { old: id, new: infos.id, details: res };

        // update group word list
        dispatch(Actions.GROUP_WORD_UPDATE(payload));
        // remove study item
        dispatch(Actions.STUDY_REMOVE(payload));
      }

      dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Study]));
    })
  );
