import React, { useState, useEffect } from 'react';

interface FetchDataComponentProps {
  url: string;
  functionName: string;
  componentName: string;
}

const FetchDataComponent: React.FC<FetchDataComponentProps> = ({ url, functionName, componentName }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/${functionName}`);
        const result = await response.json();
        console.log(result);
        setData(result[componentName] || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url, functionName, componentName]);

  console.log("fetched data", data);
  return data;
};

export default FetchDataComponent;
