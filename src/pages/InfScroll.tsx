import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'elements/InfiniteScroll';

const InfScroll = () => {
  const [id, setId] = useState(1);

  const [list, setList] = useState<number[]>([1, 2, 3, 4, 5]);

  const handleIdHit = (id: number) => {
    console.log('happened', id);
    setList(l => [...l, 1, 2, 3, 4, 5, 6, 7]);
    setId(x => x + 1);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen -mt-32">
      {list}
      <div className="h-16 border overflow-y-auto inline-block relative">
        <InfiniteScroll
          id={id}
          onIdHit={handleIdHit}
          className="bottom-0 left-0 -mt-0 h-2 -mt-6"
        >
          {list.map((x, i) => (
            <div key={i} className="w-32 h-8">
              {x}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default InfScroll;
