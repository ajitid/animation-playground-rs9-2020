import React from 'react';

import Seo from 'elements/Seo';

const DefaultLayout: React.FC<{
  pageTitle: string;
}> = ({ children, pageTitle }) => {
  return (
    <div className="relative">
      <Seo title={pageTitle} />
      <div className="flex flex-col min-h-screen justify-between">
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
};

export default DefaultLayout;
