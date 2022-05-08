import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles(({colors})=>(
  {
    wrapper: {
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
      width: '100%',
    },
    walletNameWrapper: {
      position: 'relative',
      textAlign: 'center',
      margin: [0, 'auto'],
    },
    firstCharOfName: {
      fontSize: 130,
      color: colors.basicWhite,
      position: 'absolute',
      top: -5,
      left: '50%',
      transform: 'translateX(-50%)',
    },
    walletName: {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: '40px',
      textAlign: 'center',
      marginTop: 24,
    },
    subTitle: {
      lineHeight: '20px',
      textAlign: 'center',
      marginTop: 8,
    },
    unlockForm: {
      margin: 20,
      textAlign: 'center',
    },
    unlockButton: {
      marginTop: 24,
      width: 88,
    },
  }),
{name: 'UnLockWallet'},
);
export default useStyles;
