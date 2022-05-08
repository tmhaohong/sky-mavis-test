import {createUseStyles} from 'react-jss';
const useStyles = createUseStyles(({colors})=>({
  mainAsset: {
    background: `linear-gradient(256.28deg, ${colors.blue700} 0%, ${colors.blue800} 100%)`,
    boxShadow: `0px 12px 20px -4px ${colors.basic500}`,
    borderRadius: 16,
    padding: [18, 20],
    color: colors.basicWhite,
    position: 'relative',
  },
  walletTitle: {
    fontWeight: 600,
    lineHeight: '20px',
    borderBottom: [1, 'solid', colors.primary400],
    paddingBottom: 14,
    marginBottom: 14,
    '&>img': {
      float: 'right',
    },
  },
  walletId: {
    color: colors.primary300,
    fontWeight: 400,
    marginLeft: 8,
  },
  mainCurrency: {
    fontWeight: 700,
    fontSize: 32,
    lineHeight: '40px',
    display: 'block',
    marginBottom: 4,
  },
  mainVND: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    display: 'block',
    color: colors.primary300,
  },
  roninWhite: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: [28, 0],
    '&>li': {
      margin: [0, 10],
    },
  },
  assetTitle: {
    fontWeight: 700,
    fontSize: 16,
    lineHeight: '20px',
    color: '#151A30',
    marginBottom: 12,
  },
  assetItem: {
    background: colors.basic200,
    borderRadius: 8,
    padding: [12, 20],
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    '&:firs-child': {
      marginTop: 0,
    },
    '&>img': {
      marginRight: 16,
    },
  },
  assetCurrency: {
    fontWeight: 600,
    lineHeight: '20px',
    color: colors.basic900,
    display: 'block',
    marginBottom: 4,
  },
  assetVND: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '16px',
    color: colors.basic600,
    display: 'block',
  },
}));

export default useStyles;
