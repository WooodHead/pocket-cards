import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { concat, differenceBy } from 'lodash';
import { Consts } from '@constants';
import { Domains } from 'typings';
import { STUDY_START } from './studyActions';

const studyState: Domains.StudyState = {
  current: undefined,
  mode: undefined,
  rows: [],
  history: [],
  index: 0,
};

const slice = createSlice({
  name: 'study',
  initialState: studyState,
  reducers: {
    // 単語登録正常終了
    STUDY_ANSWER: (state, { payload }: PayloadAction<boolean>) => {
      if (!payload && state.mode !== Consts.MODES.AllTest) {
        const newIdx = state.index + 1 === state.rows.length ? 0 : state.index + 1;

        // １件のみ場合、計算しない
        if (state.rows.length === 1) {
          return;
        }

        // 単語ループ表示する
        state.current = state.rows[newIdx];
        state.index = newIdx;

        return;
      }

      // 該当単語を削除する
      const newRows = [...state.rows];
      newRows.splice(state.index, 1);

      // Indexが配列の限界を超えた場合、最初から始まる
      const newIdx = state.index >= newRows.length ? 0 : state.index;

      state.rows = newRows;
      state.index = newIdx;
      state.current = newRows[newIdx];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(STUDY_START.pending, (state) => {
        state.current = undefined;
      })
      .addCase(STUDY_START.fulfilled, (state, { payload: { mode, items } }) => {
        // モード変更
        if (mode !== state.mode) {
          state.history = [];
          state.rows = items;
          state.current = items[0];
          state.index = 0;
          state.mode = mode;

          return;
        }

        // 差分を抽出する
        const differ = differenceBy(items, state.history, 'word');
        // 足りない単語数を計算する
        const diffNum = Consts.PAGE_MAX_WORDS - state.rows.length;
        // 追加する単語
        const added = differ.splice(0, diffNum);
        // 既存配列と合併する
        const newArray = concat(state.rows, added);

        // モード変わった、或いは、既存データ存在しない
        state.rows = newArray;
        state.history = concat(state.history, added);
        state.current = state.current ? state.current : newArray[0];
        state.index = state.index;
        state.mode = mode;
      });
  },
});

export default slice;
