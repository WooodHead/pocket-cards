import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ROUTE_PATHS } from '@constants';
import { WeeklyRegist } from '@containers/ability';
import { Students, Settings, GroupRouter, CurriculumOrder, MultiTest, Inquiry } from '@containers/body';
import { Header } from '@containers/com';
import { MainMenu } from '@containers/com';

export default () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <MainMenu />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Toolbar />
        <Switch>
          <Route exact path={ROUTE_PATHS.ROOT} component={GroupRouter} />
          <Route path={ROUTE_PATHS.GROUP_ROOT()} component={GroupRouter} />
          <Route path={ROUTE_PATHS.STUDENTS}>
            <Header />
            <Students />
          </Route>
          <Route path={ROUTE_PATHS.SETTINGS}>
            <Header />
            <Settings />
          </Route>
          <Route path={ROUTE_PATHS.WEEKLY}>
            <Header />
            <WeeklyRegist />
          </Route>
          <Route path={ROUTE_PATHS.CURRICULUM_ORDER}>
            <Header />
            <CurriculumOrder />
          </Route>
          <Route path={ROUTE_PATHS.MULTI_TEST}>
            <Header />
            <MultiTest />
          </Route>
          <Route path={ROUTE_PATHS.INQUIRY}>
            <Header />
            <Inquiry />
          </Route>
          {/* <Route path={ROUTE_PATHS.HISTORY}>
            <Header />
            <History />
          </Route> */}
        </Switch>
      </Box>
    </Box>
  );
};
