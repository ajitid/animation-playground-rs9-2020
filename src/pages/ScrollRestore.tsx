import React, { useState } from 'react';

import DefaultLayout from 'layouts/DefaultLayout';
import Button from 'elements/atoms/Button';

const FromState: React.FC = () => {
  const [big, setBig] = useState(false);

  return (
    <DefaultLayout pageTitle="From state">
      <div>
        <p>yeas</p>
      </div>
    </DefaultLayout>
  );
};

export default FromState;
