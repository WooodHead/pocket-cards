import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Domains, Payloads, Tables } from 'typings';
import { Consts } from '@constants';
import {
  GROUP_DELETE,
  GROUP_LIST,
  GROUP_QUESTION_LIST,
  GROUP_STATUS,
  GROUP_WORD_DETAILS,
  GROUP_WORD_LIST,
} from './groupActions';
import sortBy from 'lodash/sortBy';

const grpState: Domains.GroupState = {
  searchWord: '',
  activeGroup: '',
  groupWords: {},
  groups: [],
  regists: [],
  current: undefined,
  status: undefined,
  editable: -1,
  questions: [],
};

const slice = createSlice({
  name: 'group',
  initialState: grpState,
  reducers: {
    // グループ編集モード
    GROUP_EDITABLE: (state, { payload }: PayloadAction<Consts.EDIT_MODE>) => {
      state.editable = payload;
    },

    // グループを選択
    GROUP_ACTIVE: (state, { payload }: PayloadAction<string>) => {
      state.activeGroup = payload;
      state.searchWord = '';
    },

    // グループを選択
    GROUP_CLEAN: (state) => {
      const { activeGroup, groupWords } = state;

      // delete object
      delete groupWords[activeGroup];

      // clean
      state.groupWords = groupWords;
      state.activeGroup = '';
    },

    // グループ登録
    GROUP_REGIST: (state, { payload }: PayloadAction<Tables.TGroups>) => {
      state.groups.push(payload);
    },

    // グループ単語の検索
    GROUP_WORD_SEARCH: (state, { payload }: PayloadAction<string>) => {
      state.searchWord = payload;
    },

    // グループ単語の追加
    GROUP_WORD_ADDED: (state, { payload }: PayloadAction<Payloads.GroupWordDetails>) => {
      const { activeGroup, groupWords } = state;
      const array = [...groupWords[activeGroup], payload];

      // 単語リスト
      state.groupWords[activeGroup] = array;
    },

    // グループ単語の削除
    GROUP_WORD_REMOVE: (state, { payload: { id, word } }: PayloadAction<Payloads.RemoveWordInGroup>) => {
      const groupWords = state.groupWords[id];

      // data not exists
      if (groupWords) {
        // 単語リスト
        state.groupWords[id] = groupWords.filter((item) => item.id !== word);
      }
    },

    // グループ単語の詳細
    GROUP_WORD_DETAILS: (state, { payload }: PayloadAction<Payloads.GroupWordDetails>) => {
      state.current = payload;
    },

    // グループ単語の詳細
    GROUP_WORD_UPDATE: (state, { payload }: PayloadAction<Payloads.GroupWordUpdate>) => {
      const items = state.groupWords[state.activeGroup];

      if (items) {
        // remove old word and add new word
        const oldIndex = items.findIndex((item) => item.id === payload.old);
        items[oldIndex] = payload.details;

        state.groupWords[state.activeGroup] = items;
      }
    },

    // 登録単語一覧を保管
    GROUP_REGIST_SAVE: (state, { payload }: PayloadAction<string[]>) => {
      state.regists = payload.filter((item) => item.trim().length > 0);
    },

    // 単語登録一覧をクリア
    GROUP_REGIST_CLEAR: (state) => {
      state.regists = [];
    },

    // 単語登録一覧をクリア
    GROUP_REGIST_REMOVE: (state, { payload }: PayloadAction<string>) => {
      state.regists = state.regists.filter((item) => item !== payload);
    },

    // 単語登録一覧をクリア
    GROUP_QUESTION_CLEAR: (state) => {
      state.questions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // get group list
      .addCase(GROUP_LIST.fulfilled, (state, { payload }) => {
        // sort by name
        if (payload) {
          state.groups = sortBy(payload, ['name']);
        } else {
          state.groups = payload;
        }
      })
      // delete group id
      .addCase(GROUP_DELETE.fulfilled, (state) => {
        state.groups = state.groups.filter((item) => item.id !== state.activeGroup);
      })
      .addCase(GROUP_STATUS.fulfilled, (state, { payload }) => {
        state.status = payload;
      })
      // add words in group
      .addCase(GROUP_WORD_LIST.fulfilled, (state, { payload }) => {
        state.groupWords[payload.id] = payload.items;
      })
      .addCase(GROUP_WORD_DETAILS.pending, (state) => {
        state.current = undefined;
      })
      .addCase(GROUP_WORD_DETAILS.fulfilled, (state, { payload }) => {
        state.current = payload;
      })
      .addCase(GROUP_QUESTION_LIST.fulfilled, (state, { payload }) => {
        state.questions = payload;
      });
  },
});

export default slice;
