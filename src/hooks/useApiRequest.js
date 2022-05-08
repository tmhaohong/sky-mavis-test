import {useReducer} from 'react';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import merge from 'lodash/merge';
import includes from 'lodash/includes';
import {toast} from 'react-toastify';

const useApiRequest = (
  endpoint,
  {verb = 'get', params = {}, config = {}} = {},
  {reducer, initialState, fetching, success, error},
) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {t} = useTranslation();
  const makeRequest = async () => {
    dispatch(fetching());
    try {
      let response;
      if (includes('get;delete;head', verb)) {
        response = await axios[verb](
          endpoint,
          merge(config, {
            params: {
              time: Date.now(),
            },
          }),
        );
      } else {
        response = await axios[verb](endpoint, params, config);
      }
      dispatch(success(response.data));
    } catch (e) {
      if (e.response) {
        dispatch(error(e.response.data));
      } else {
        toast.error(t('common.commonError'));
      }
    }
  };
  return [state, makeRequest];
};

export default useApiRequest;
