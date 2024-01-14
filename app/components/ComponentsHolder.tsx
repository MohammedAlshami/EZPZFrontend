import React from 'react';
import UiComponent from './UiComponent';

interface ComponentsHolderProps {
    name: string;
}

const ComponentsHolder: React.FC<ComponentsHolderProps> = ({ name }) => {
    // Define the number of iterations
    const numberOfIterations = 5;

    // Create an array with the same length as the number of iterations
    const iterationArray = Array.from({ length: numberOfIterations }, (_, index) => index);

    return (
        <div className="flex justify-center w-full">
            <div className="grid grid-cols-1  w-full gap-12 m-12">
                {iterationArray.map((iteration) => (
                    <UiComponent
                        key={iteration}
                        id={String(iteration)}
                        name={name}
                        src={`static/images/${name}/${iteration+1}.png`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ComponentsHolder;
