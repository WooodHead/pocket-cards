import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Auth from '@aws-amplify/auth';
import { Paths } from '@constants';
import * as Actions from '@actions/app';

const auth: React.FunctionComponent<any> = (props) => {
  const [user, setUser] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const actions = bindActionCreators(Actions, useDispatch());

  React.useEffect(() => {
    if (user) return;

    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      setUser(user);

      actions.loggedIn(user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div />;

  return user ? <Route {...props} /> : <Redirect to={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.SignIn]} />;
};

export default auth;
