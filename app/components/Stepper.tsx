'use client';
import React, { useState } from 'react'
import ComponentsHolder from './ComponentsHolder'
import FetchDataComponent from './functions/GetComponents';
import useGetWebsiteUrlComponent from './functions/GetWebsiteUrl';
// const heroData = FetchDataComponent({ url: 'http://localhost:8000', functionName: 'get_hero_data', componentName: 'hero' });

const Stepper = () => {
    const heroData = FetchDataComponent({ url: 'http://localhost:8000', functionName: 'get_hero_data', componentName: 'hero' });
    const navbarData = FetchDataComponent({ url: 'http://localhost:8000', functionName: 'get_navbar_data', componentName: 'navbar' });
    const footerData = FetchDataComponent({ url: 'http://localhost:8000', functionName: 'get_footer_data', componentName: 'footer' });
    const featuresData = FetchDataComponent({ url: 'http://localhost:8000', functionName: 'get_features_data', componentName: 'features' });

    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

    const handleUrlFetched = (fetchedUrl: string) => {
        setRedirectUrl(fetchedUrl);
    };
    const makeIframeContentEditable = (editable: boolean) => {
        // Get the iframe element
        const iframe = document.getElementById('final_content') as HTMLIFrameElement;

        // Check if the iframe exists
        if (iframe) {
            var srcdocContent;
            if (editable) {
                srcdocContent = iframe.srcdoc;
            }
            else {
                const contentDocument = iframe.contentDocument;
                const editedContent = contentDocument.body.innerHTML;
                const text = `<html><head><script src="https://cdn.tailwindcss.com"><\/script><script src=" https://cdn.jsdelivr.net/npm/preline@2.0.3/dist/preline.min.js "></script></head><body>` + editedContent;
                // Access the srcdoc content
                srcdocContent = text;
            }



            // Create a temporary div to manipulate the content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = srcdocContent;

            // Make all children of the iframe content non-editable
            const allChildren = tempDiv.querySelectorAll('*');
            allChildren.forEach((child) => {
                (child as HTMLElement).contentEditable = editable ? 'true' : 'false';
            });

            // Set the modified content back to the iframe
            iframe.srcdoc = tempDiv.innerHTML;
        } else {
            console.error('Iframe not found!');
        }
    };
    const fetchAndRedirect = async () => {
        const serverUrl = 'http://localhost:8000';
        const functionName = 'get_website_url';
        makeIframeContentEditable(false);
        const iframe = document.getElementById('final_content') as HTMLIFrameElement;
        const htmlContent = iframe.srcdoc;



        try {
            const response = await fetch(`${serverUrl}/${functionName}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ htmlContent }),
            });

            const result = await response.json();
            console.log(result);

            var fetchedUrl = result.fetchedUrl;
            fetchedUrl = "http://localhost:3000/hosting?src=" + fetchedUrl;
            var anchorTag = document.getElementById("hosted_website_url") as HTMLAnchorElement
            anchorTag.href = fetchedUrl;
            anchorTag.textContent = fetchedUrl;

            // document.getElementById("hosted_website_url").href = fetchedUrl
            handleUrlFetched(fetchedUrl);

            // Once the asynchronous operation is complete, redirect to the fetched URL
            // if (fetchedUrl) {
            //     window.location.href = fetchedUrl;
            // }
        } catch (error) {
            console.error('Error fetching URL:', error);
        }
    };

    const handleButtonClick = () => {
        const selectedRadioButtons = [];

        // Loop through all forms
        for (let i = 1; i <= 4; i++) {
            const formId = i === 1 ? 'Nav' : i === 2 ? 'Hero' : i === 3 ? 'Features' : 'Footer';

            // Loop through all radio buttons in each form
            for (let j = 0; j <= 4; j++) {
                const radioButton = document.getElementById(`${formId}${j}`);

                // Check if the radio button is selected
                if (radioButton.checked) {
                    selectedRadioButtons.push(j);
                }
            }
        }

        // console.log();
        const websiteContent = navbarData[selectedRadioButtons[0]] + heroData[selectedRadioButtons[1]] + featuresData[selectedRadioButtons[2]] + footerData[selectedRadioButtons[3]]
        const text = `<html><head><script src="https://cdn.tailwindcss.com"><\/script><script src=" https://cdn.jsdelivr.net/npm/preline@2.0.3/dist/preline.min.js "></script></head><body>` + websiteContent;

        // Display the selected radio button IDs in an alert
        // alert(`Selected Radio Buttons: ${selectedRadioButtons.join(', ')}`);
        var iframe = (document?.getElementById('final_content') as HTMLIFrameElement);

        // code generated
        if (iframe) {
            iframe.srcdoc = text;


        }
        makeIframeContentEditable(true);
    };
    return (
        <>

            {/* Stepper */}
            <div data-hs-stepper>
                {/* Stepper Nav */}
                <ul className="relative flex flex-row gap-x-2">
                    <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group" data-hs-stepper-nav-item="{
      &quot;index&quot;: 1
    }">
                        <span className="min-w-[28px] min-h-[28px] group inline-flex items-center text-xs align-middle">
                            <span className="w-7 h-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-gray-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
                                <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">1</span>
                                <svg className="hidden flex-shrink-0 h-3 w-3 hs-stepper-success:block" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </span>
                            <span className="ms-2 text-sm font-medium text-gray-800">
                                Navigation Bar
                            </span>
                        </span>
                        <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600" />
                    </li>
                    <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group" data-hs-stepper-nav-item="{
      &quot;index&quot;: 2
    }">
                        <span className="min-w-[28px] min-h-[28px] group inline-flex items-center text-xs align-middle">
                            <span className="w-7 h-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-gray-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
                                <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">2</span>
                                <svg className="hidden flex-shrink-0 h-3 w-3 hs-stepper-success:block" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </span>
                            <span className="ms-2 text-sm font-medium text-gray-800">
                                Hero
                            </span>
                        </span>
                        <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600" />
                    </li>
                    <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group" data-hs-stepper-nav-item="{
        &quot;index&quot;: 3
      }">
                        <span className="min-w-[28px] min-h-[28px] group inline-flex items-center text-xs align-middle">
                            <span className="w-7 h-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-gray-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
                                <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">3</span>
                                <svg className="hidden flex-shrink-0 h-3 w-3 hs-stepper-success:block" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </span>
                            <span className="ms-2 text-sm font-medium text-gray-800">
                                Features
                            </span>
                        </span>
                        <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600" />
                    </li>
                    <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group" data-hs-stepper-nav-item="{
        &quot;index&quot;: 4
      }">
                        <span className="min-w-[28px] min-h-[28px] group inline-flex items-center text-xs align-middle">
                            <span className="w-7 h-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-gray-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
                                <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">4</span>
                                <svg className="hidden flex-shrink-0 h-3 w-3 hs-stepper-success:block" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </span>
                            <span className="ms-2 text-sm font-medium text-gray-800">
                                Footer
                            </span>
                        </span>
                        <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600" />
                    </li>
                    {/* End Item */}
                </ul>
                <div className="mt-5 flex justify-between items-center gap-x-2">
                    <button type="button" className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-stepper-back-btn>
                        <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        Back
                    </button>
                    <button type="button" className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" data-hs-stepper-next-btn>
                        Next
                        <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                    <button type="button" onClick={handleButtonClick} className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" data-hs-stepper-finish-btn style={{ display: 'none' }}>
                        Finish
                    </button>

                </div>
                {/* End Stepper Nav */}
                {/* Stepper Content */}
                <div className="mt-5 sm:mt-8">
                    {/* First Contnet */}
                    <div data-hs-stepper-content-item="{
      &quot;index&quot;: 1
    }">
                        <form action="" id='form1'>
                            <ComponentsHolder name='Nav' />
                        </form>
                    </div>
                    {/* End First Contnet */}
                    {/* First Contnet */}
                    <div data-hs-stepper-content-item="{
      &quot;index&quot;: 2
    }" style={{ display: 'none' }}>
                        <form action="" id='form2'>
                            <ComponentsHolder name='Hero' />
                        </form>
                    </div>
                    {/* End First Contnet */}
                    {/* First Contnet */}
                    <div data-hs-stepper-content-item="{
      &quot;index&quot;: 3
    }" style={{ display: 'none' }}>
                        <form action="" id='form3'>
                            <ComponentsHolder name='Features' />
                        </form>
                    </div>
                    <div data-hs-stepper-content-item="{
      &quot;index&quot;: 4
    }" style={{ display: 'none' }}>
                        <form action="" id='form4'>
                            <ComponentsHolder name='Footer' />
                        </form>
                    </div>
                    {/* End First Contnet */}
                    {/* Final Contnet */}
                    <div data-hs-stepper-content-item="{
      &quot;isFinal&quot;: true
    }" style={{ display: 'none' }}>
                        {/* <div className="p-4 h-48 bg-gray-50 flex justify-center items-center border border-dashed border-gray-200 rounded-xl">
                            <h3 className="text-gray-500">
                                Final content
                            </h3>
                        </div> */}
                        {/* <div id='final_content'>

                        </div> */}

                        <div className='w-full flex gap-10 items-center mb-12'>
                            <button onClick={fetchAndRedirect} className='bg-blue-600  px-8 h-12 rounded-lg text-white w-2/12'>
                                Host
                            </button>
                            <div className='w-full h-12 focus:border bg-gray-200 flex items-center p-4 m-4 rounded-lg'>
                                <a href="" id='hosted_website_url' className='text-blue-600'></a>
                            </div>
                        </div>
                        {/* <a className='bg-blue-600 p-4 px-8 rounded-lg text-white'>Host Website</a> */}
                        <div className='rounded-lg border-8'>
                            <iframe id="final_content" className='w-full h-screen' ></iframe>
                        </div>
                    </div>
                    {/* End Final Contnet */}
                    {/* Button Group */}

                    {/* End Button Group */}
                </div>
                {/* End Stepper Content */}
            </div>
            {/* End Stepper */}
        </>
    )
}

export default Stepper