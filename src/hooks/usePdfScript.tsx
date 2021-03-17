
import { useEffect } from 'react';

const usePdfScript = (jscode: string) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.type= "text/javascript";
    script.innerHTML = jscode;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [jscode]);
};

export default usePdfScript;