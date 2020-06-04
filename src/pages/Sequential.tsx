import React from 'react';

import DefaultLayout from 'layouts/DefaultLayout';

const Sequential = () => {
  return (
    <DefaultLayout pageTitle="Sequential">
      <div className="container mx-auto pt-4">
        <p className="text-gray-600 leading-tight">
          Watch this{' '}
          <a
            href="https://youtu.be/5QCYBiANRYs?t=973"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue-700"
          >
            video by Alec Larson covering chain API
          </a>
          .
        </p>
      </div>
    </DefaultLayout>
  );
};

export default Sequential;
