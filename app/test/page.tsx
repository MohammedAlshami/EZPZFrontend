'use client';
import React from 'react';
import FetchDataComponent from '../components/functions/GetComponents';
import parse from 'html-react-parser';

const page: React.FC = () => {
    const heroData = FetchDataComponent({ url: 'http://localhost:8000', functionName: 'get_hero_data', componentName: 'hero' });
    const navbarData = FetchDataComponent({ url: 'http://localhost:8000', functionName: 'get_navbar_data', componentName: 'navbar' });

    const renderHTML = (html: string) => ({ __html: html });

    return (
        <div>
            <h2>Hero Data:</h2>
            <ul>
                {heroData.map((item, index) => (
                    <div className="prose" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
            </ul>

            <h2>Navbar Data:</h2>
            <ul>
                {navbarData.map((item, index) => (
                    parse(String(item))
                ))}
            </ul>
        </div>
    );
};

export default page;


// // pages/index.js
// 'use client';
// // pages/index.js

// import React from 'react';

// const page = () => {
//   const handleButtonClick = () => {
//     const selectedRadioButtons = [];

//     // Loop through all forms
//     for (let i = 1; i <= 3; i++) {
//       const formId = i === 1 ? 'nav' : i === 2 ? 'hero' : 'footer';

//       // Loop through all radio buttons in each form
//       for (let j = 1; j <= 3; j++) {
//         const radioButton = document.getElementById(`${formId}${j}`);

//         // Check if the radio button is selected
//         if (radioButton.checked) {
//           selectedRadioButtons.push(radioButton.id);
//         }
//       }
//     }

//     // Display the selected radio button IDs in an alert
//     alert(`Selected Radio Buttons: ${selectedRadioButtons.join(', ')}`);
//   };

//   return (
//     <div>
//       {/* Form 1 */}
//       <form id="nav">
//         <p>Form 1 (nav):</p>
//         <label>
//           <input type="radio" id="nav1" name="nav" /> Option 1
//         </label>
//         <label>
//           <input type="radio" id="nav2" name="nav" /> Option 2
//         </label>
//         <label>
//           <input type="radio" id="nav3" name="nav" /> Option 3
//         </label>
//       </form>

//       {/* Form 2 */}
//       <form id="hero">
//         <p>Form 2 (hero):</p>
//         <label>
//           <input type="radio" id="hero1" name="hero" /> Option 1
//         </label>
//         <label>
//           <input type="radio" id="hero2" name="hero" /> Option 2
//         </label>
//         <label>
//           <input type="radio" id="hero3" name="hero" /> Option 3
//         </label>
//       </form>

//       {/* Form 3 */}
//       <form id="footer">
//         <p>Form 3 (footer):</p>
//         <label>
//           <input type="radio" id="footer1" name="footer" /> Option 1
//         </label>
//         <label>
//           <input type="radio" id="footer2" name="footer" /> Option 2
//         </label>
//         <label>
//           <input type="radio" id="footer3" name="footer" /> Option 3
//         </label>
//       </form>

//       {/* Button to trigger the alert */}
//       <button onClick={handleButtonClick}>Show Selected Radio Buttons</button>
//     </div>
//   );
// };

// export default page;
