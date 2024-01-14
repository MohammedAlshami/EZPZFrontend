'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  // Extract the 'src' parameter from the URL
  const searchParams = useSearchParams();
  const srcParam = searchParams.get('src');

  if (!srcParam) {
    return null; // or handle the case where srcParam is not available
  }

  return (
    <>
      {/* Use the extracted and encoded 'src' parameter in the iframe */}
      <iframe className='h-screen w-screen' src={`http://127.0.0.1:8000/get_website_by_uuid/${srcParam}`}></iframe>
    </>
  );
}

export default Page;
