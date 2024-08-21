import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axiosInstance';

const useAxios = ({ url, method, body = null, errorMessage = null, redirectToURL = null, showError = false,triggerStatus = true}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(triggerStatus);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance[method](url, body);
      if (response.status !== 200) {
        throw new Error("Error: No data");
      }
      setData(response.data);
    } catch (err) {
      setError(errorMessage || err.message);
      if (showError) {
        alert(errorMessage || err.message);
      } else {
        console.log(errorMessage || err.message);
      }
      if (redirectToURL) {
        navigate(redirectToURL);
      }
    } finally {
      setLoading(false);
    }
  }, [url, method, body, errorMessage, redirectToURL, navigate, showError,triggerStatus]);

  useEffect(() => {
    if (trigger) {
      fetchData();
    }
  }, [trigger, fetchData]);

  const triggerFetch = () => {
    setTrigger(true);
  };

  return { data, loading, error, triggerFetch };
};

export default useAxios;