import React from 'react';

interface UiComponentProps {
  id: string;
  name: string;
  src: string;
}

const UiComponent: React.FC<UiComponentProps> = ({ id, name, src }) => {
  const componentId = `${name}${id}`;

  return (
    <>
      <label
        htmlFor={componentId}
        className="hover:shadow-xl hover:cursor-pointer bg-fuchsia-500 w-full h-fit rounded-lg transform hover:translate-y-[-10%] transition-transform duration-300 border-4 relative block"
      >
        <input
          id={componentId}
          type="radio"
          value=""
          name="list-radio"
          className="absolute top-2 left-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 z-10"
        />
        <img
          src={src}
          alt=""
          className="w-full h-full object-fit"
        />
      </label>
    </>
  );
};

export default UiComponent;
