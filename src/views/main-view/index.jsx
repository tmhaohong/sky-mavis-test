import {Fragment} from 'react';
import {createUseStyles} from 'react-jss';
import {Outlet} from 'react-router-dom';

import Header from 'components/header';

const useStyles = createUseStyles({
  mainWrapper: {
    position: 'relative',
    padding: [0, 20, 20, 20],
  },
});

const Main = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Header />
      <div className={classes.mainWrapper}>
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Main;
