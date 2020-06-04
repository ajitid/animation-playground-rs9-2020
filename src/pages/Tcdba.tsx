import React from 'react';

import DefaultLayout from 'layouts/DefaultLayout';

const Tcdba = () => {
  return (
    <DefaultLayout pageTitle="Cards drag and blur">
      <div className="container mx-auto pt-4">
        <p>
          See{' '}
          <a
            href="https://t.co/2XfeX5jjC0?amp=1."
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue-700"
          >
            this sandbox
          </a>
          .
        </p>
      </div>
    </DefaultLayout>
  );
};

export default Tcdba;
