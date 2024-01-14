import React, { useState, useEffect } from 'react';

interface GetWebsiteUrlComponentProps {
  url: string;
  functionName: string;
  htmlContent: string;
  onUrlFetched: (url: string) => void;
}

const useGetWebsiteUrlComponent: React.FC<GetWebsiteUrlComponentProps> = ({ url, functionName, htmlContent, onUrlFetched }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/${functionName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ htmlContent }),
        });

        const result = await response.json();
        console.log(result);

        const fetchedUrl = result.fetchedUrl;
        onUrlFetched(fetchedUrl);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url, functionName, htmlContent, onUrlFetched]);

  return null; // No need to return anything here, as the fetched URL will be handled by the callback.
};

export default useGetWebsiteUrlComponent;
