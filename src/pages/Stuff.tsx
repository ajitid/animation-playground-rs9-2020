import React, { useState, useRef } from 'react';
import { a, useSpring } from '@react-spring/web';

import useMove from 'flicky/utils/move/useMove';
import DefaultLayout from 'layouts/DefaultLayout';
import Link from 'elements/atoms/Link';

const Stuff = () => {
  const [right, setRight] = useState(false);

  const boxRef = useRef(null);
  const magicStyles = useMove({
    id: 'box',
    ref: boxRef,
    key: right,
  });

  const style = useSpring({
    backgroundColor: right ? 'pink' : '#bada55',
  });

  return (
    <DefaultLayout pageTitle="Stuff">
      <div className="container mx-auto pt-4">
        <Link to="stuff2">stuff2</Link>
        <button
          onClick={() => {
            setRight(right => !right);
          }}
        >
          switch
        </button>
        <div className={`flex ${right ? 'justify-end' : ''}`}>
          {right ? (
            <a.div
              ref={boxRef}
              style={{ ...magicStyles, transformOrigin: '0% 0%', ...style }}
              className="w-16 h-16 bg-gray-400 p-1"
            >
              <a.div
                style={{
                  scaleY: magicStyles.scaleY.to(v => (v > 0.01 ? 1 / v : 10000)),
                  scaleX: magicStyles.scaleX.to(v => (v > 0.01 ? 1 / v : 10000)),
                }}
              >
                <p>stu</p>
              </a.div>
            </a.div>
          ) : (
            <a.div
              ref={boxRef}
              style={{ ...magicStyles, transformOrigin: '0% 0%', ...style }}
              className="w-16 h-32 bg-gray-400 p-1"
            >
              <a.div
                style={{
                  scaleY: magicStyles.scaleY.to(v => (v > 0.01 ? 1 / v : 10000)),
                  scaleX: magicStyles.scaleX.to(v => (v > 0.01 ? 1 / v : 10000)),
                }}
              >
                <p>sa</p>
              </a.div>
            </a.div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};
// const Stuff = () => {
//   const [boxes, setBoxes] = useState([1, 2, 3, 4]);

//   return (
//     <DefaultLayout pageTitle="Stuff">
//       <div className="container mx-auto pt-4">
//         <button
//           onClick={() => {
//             setBoxes(prevBoxes => {
//               const boxes = [...prevBoxes];
//               boxes.splice(0, 1);
//               return boxes;
//             });
//           }}
//         >
//           switch
//         </button>
//         <Flipper flipKey={boxes}>
//           <div className="flex justify-between">
//             {boxes.map(box => (
//               <Flipped key={box} flipId={box}>
//                 <div className="w-16 h-16 bg-gray-400" />
//               </Flipped>
//             ))}
//           </div>
//         </Flipper>
//       </div>
//     </DefaultLayout>
//   );
// };

export default Stuff;
