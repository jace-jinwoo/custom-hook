const useHttp = (reqConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApis = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        reqConfig.url,
        {
          method: reqConfig.method,
          headers: reqConfig.headers,
          body: JSON.stringify(reqConfig.body),
        }
        //   'https://react-http-6b4a6.firebaseio.com/tasks.json'
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    isLoading,
    error,
    callApis,
  };
};

export default useHttp;
