// pages/index.tsx

'use client';
import './styles.css'
import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
const page: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const sendRequest = async () => {
        setLoading(true);

        try {
            const apiKey = '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';
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'ft:gpt-3.5-turbo-0613:personal::8fhfQQfB',
                    messages: [
                        { "role": "system", "content": "Marv is a smart chatbot that generates HTML Tailwind components." },
                        { "role": "user", "content": `${prompt} [response should be in HTML and always give a full response]` }
                    ]
                }),
            });

            const jsonResponse = await response.json();
            var text = jsonResponse.choices[0].message.content;

            text = `<head><script src="https://cdn.tailwindcss.com"><\/script></head>` + text;

            var iframe = document.getElementById('myIframe') as HTMLIFrameElement;
            iframe.srcdoc = text;

            document.getElementById('typingOutput').innerHTML = '<span class="typing-text">Here\'s your generated code:</span>';

        } catch (error) {
            console.error("Error sending request:", error);
            document.getElementById("myIframe").srcdoc = "Error: Could not process request.";
        } finally {
            setLoading(false);
        }
    };

    const copyCode = () => {
        var codeToCopy = document.getElementById('myIframe').srcdoc;

        var tempTextArea = document.createElement('textarea');
        tempTextArea.value = codeToCopy;
        document.body.appendChild(tempTextArea);

        tempTextArea.select();
        document.execCommand('copy');

        document.body.removeChild(tempTextArea);

        showPopup('Code copied to clipboard!');
    };

    const showPopup = (message: string) => {
        var popup = document.createElement('div');
        popup.className = 'popup';
        popup.textContent = message;
        document.body.appendChild(popup);

        setTimeout(function () {
            popup.style.animation = 'none';
            popup.offsetHeight;
            popup.style.animation = null;

            document.body.removeChild(popup);
        }, 2000);
    };

    const showLoadingOverlay = () => {
        document.getElementById('loadingOverlay').style.display = 'flex';
    };

    const hideLoadingOverlay = () => {
        document.getElementById('loadingOverlay').style.display = 'none';
    };

    const suggestTag = (tag: string) => {
        setPrompt(tag);
        sendRequest();
    };

    return (
        <div className='pt-44'>
            <Navbar></Navbar>
            <div className="font-sans text-white">
                <div className="grid grid-cols-2">
                    <div className="left-bg-container">
                        <div className="input-container glow-button">
                            <h2 className="text-white mb-4">Enter Tailwind CSS that you would like to create:</h2>
                            <form id="inputForm" className="flex flex-col items-center">
                                <div className="mb-4 placeholder-container">
                                    <label htmlFor="prompt" className="text-white"></label>
                                    <input
                                        type="text"
                                        id="prompt"
                                        className="w-full h-32 p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                        placeholder="A Tailwind sign-up form with glowing border"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                    />
                                </div>
                                <button type="button" onClick={sendRequest} className="bg-blue-500 text-white px-4 py-2 rounded glow-button">Generate Output</button>
                            </form>
                        </div>
                        <div className="related-search-container">
                            <h2 className="text-white mb-4">Suggested Tags</h2>
                            <div className="tag-form">
                                <div className="tag" onClick={() => suggestTag('Sign Up Form')}>Sign Up Form</div>
                                <div className="tag" onClick={() => suggestTag('Custom Card')}>Custom Card</div>
                                <div className="tag" onClick={() => suggestTag('Sign In Form')}>Sign In Form</div>
                                <div className="tag" onClick={() => suggestTag('Login')}>Login </div>
                                <div className="tag" onClick={() => suggestTag('Navigation Bar')}>Navigation Bar</div>
                                <div className="tag" onClick={() => suggestTag('FAQ Sections')}>FAQ Section</div>
                                <div className="tag" onClick={() => suggestTag('Subscription')}>Subscription</div>
                            </div>
                        </div>
                    </div>
                    <div className="right-bg-container">
                        <div className="output-container glow-button">
                            <h2 className="text-white mb-4">Generated Output</h2>
                            <div id="typingOutput" className="typing-text"></div>
                            <iframe id="myIframe" width="100%" height="400" frameBorder={0}></iframe>
                            <button type="button" onClick={copyCode} className="mt-4 bg-green-500 text-white px-4 py-2 rounded glow-button">Copy Code</button>
                        </div>
                    </div>
                </div>

                <div className="loading-overlay" id="loadingOverlay" style={{ display: loading ? 'flex' : 'none' }}>
                    <div className="loading-spinner"></div>
                    Fetching output...
                </div>
            </div>
            <Footer></Footer>

        </div>
    );
};

export default page;
