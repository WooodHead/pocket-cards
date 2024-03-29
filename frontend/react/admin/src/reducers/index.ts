import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import App from './app';
import Group from './group';
import User from './user';
import Study from './study';
import * as GroupActions from './groupActions';
import * as UserActions from './userActions';
import * as StudyActions from './studyActions';

import { Domains } from 'typings';

export default (history: History<any>) =>
  combineReducers<Domains.States>({
    router: connectRouter(history),
    app: App.reducer,
    group: Group.reducer,
    user: User.reducer,
    study: Study.reducer,
  });

export const Actions = {
  ...App.actions,
  ...Group.actions,
  ...User.actions,
  ...Study.actions,
  ...GroupActions,
  ...UserActions,
  ...StudyActions,
};
