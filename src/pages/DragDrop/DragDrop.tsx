import React, { useState } from 'react';
import { a, useSpring } from '@react-spring/web';

import DefaultLayout from 'layouts/DefaultLayout';
import { AlertCircle } from 'react-feather';

const DragDrop: React.FC = () => {
  return (
    <DefaultLayout pageTitle="Drag and drop">
      <div className="min-h-screen bg-cbn-800 text-cbn-100">
        <section className="py-4 bg-cbn-900 px-2">
          <div
            style={{
              maxWidth: 140,
              minHeight: 100,
            }}
            className="bg-cbn-700 p-2 rounded"
          >
            <div className="text-lg font-medium tracking-wide text-blue-400 uppercase">
              Complex
            </div>
          </div>
        </section>
        <section>
          <div className="flex">
            <div
              style={{
                minWidth: 240,
                minHeight: 170,
              }}
              className="shadow-lg mx-5 mt-5 p-2 rounded bg-cbn-700 "
            >
              <div className="flex justify-between">
                <div>
                  <div className="text-lg font-medium tracking-wide text-blue-400 uppercase">
                    Complex
                  </div>
                </div>
                <div>
                  <div className="uppercase text-sm font-medium bg-red-600 text-cbn-700 rounded-sm px-1">
                    {/* Secondary -> */}
                    {/* <div className="uppercase text-sm font-medium bg-red-800 bg-opacity-25 text-red-500 rounded-sm px-1"> */}
                    Critical
                  </div>
                </div>
              </div>
              <div
                style={{ fontVariantNumeric: 'tabular-nums' }}
                className="text-5xl text-center font-medium"
              >
                700
              </div>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default DragDrop;
