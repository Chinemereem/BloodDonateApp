/* eslint-disable curly */
import {useCallback, useState, useMemo} from 'react';
import {useDispatch} from 'react-redux';

export const useReduxAction = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleAction = async (action, payload) => {
    setLoading(true);
    try {
      const response = await dispatch(action(payload));
      if (response.error) {
      }
      setData(response);

      return response;
    } catch (err) {
      setError(JSON.parse(err?.message));

      return JSON.parse(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = useCallback(() => {
    if (loading) return 'loading';
    if (data) {
      if (data?.data) return 'success';
      if (!data?.data || data?.data.length < 1) return 'noData';
    }
  }, [data, loading]);

  return {
    handleAction,
    loading,
    data,
    error,
    status: getStatus(),
  };
};
