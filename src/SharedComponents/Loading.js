import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className='flex justify-center mx-auto'>
            <ThreeDots color="#2CA4D8" ariaLabel="loading-indicator" />
        </div>
    );
};

export default Loading;