import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Route, Switch, useRouteMatch, useLocation } from 'react-router-dom';
import { Paths, Consts } from '@constants';
import { AppActions, AdminActions } from '@actions';
import { DrawerLeft, Mainboard, QuestionList, Students, Settings, GroupDetails } from '.';
import { RootState } from 'typings';

const appState = (state: RootState) => state.app;

export default () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const actions = bindActionCreators(AppActions, useDispatch());
  const adminActions = bindActionCreators(AdminActions, useDispatch());

  const { authority } = useSelector(appState);

  const handleUserReigst = () => actions.showUserRegist();
  const handleLogout = () => actions.logout();
  const handleGroupAdd = () => adminActions.transitToGroupRegist();

  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerLeft />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}>
        <AppBar
          position="fixed"
          sx={{
            boxShadow: 'none',
            height: ({ spacing }) => spacing(8),
            bgcolor: 'primary.main',
            userSelect: 'none',
            width: { sm: `calc(100% - 200px)` },
            ml: { sm: `200px` },
          }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Guardian Dashboard
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
              {(() => {
                if (authority !== Consts.Authority.ADMIN) return;

                return (
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ mx: 1, borderRadius: 0, width: 96 }}
                    onClick={handleGroupAdd}>
                    ADD
                  </Button>
                );
              })()}
              {(() => {
                if (pathname !== Paths.PATHS_ADMIN_STUDENTS) return;
                if (authority !== Consts.Authority.PARENT) return;

                return (
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ mx: 1, borderRadius: 0, width: 96 }}
                    onClick={handleUserReigst}>
                    ADD
                  </Button>
                );
              })()}
              <Button
                variant="outlined"
                color="inherit"
                sx={{ mx: 1, borderRadius: 0, width: 96 }}
                onClick={handleLogout}>
                LOGOUT
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Switch>
          <Route exact path={path} component={Mainboard} />
          <Route path={Paths.PATHS_ADMIN_GROUP_DETAILS} component={GroupDetails} />
          <Route path={Paths.PATHS_ADMIN_QUESTIONS} component={QuestionList} />
          <Route path={Paths.PATHS_ADMIN_STUDENTS} component={Students} />
          <Route path={Paths.PATHS_ADMIN_SETTINGS} component={Settings} />
        </Switch>
      </Box>
    </Box>
  );
};
