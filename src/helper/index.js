export const formatNumber = (number) => number ? number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') : number;

export const formatCardNumber = (number) => number ? number.toString().replace(/^(\d{4})\s?\-?\s?(\d{4})\s?\-?\s?(\d{4})\s?\-?\s?(\d{4})$/g, '$1 $2 $3 $4') : number;

import EURIcon from 'images/eur.png';
import YENIcon from 'images/yen.png';
import USDIcon from 'images/usd.png';
export const currencyIcons = {
  EUR: EURIcon,
  YEN: YENIcon,
  USD: USDIcon,
};
