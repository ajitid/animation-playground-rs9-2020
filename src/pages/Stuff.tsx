import React, { useState, useRef, useEffect, useMemo } from 'react';
import { a, useSpring, useTransition } from '@react-spring/web';
import { Flipper, Flipped } from 'react-flip-toolkit';

import useMove from 'flicky/move/useMove';
import Move from 'flicky/move/Move';
import DefaultLayout from 'layouts/DefaultLayout';
import Link from 'elements/atoms/Link';
import Animate from 'flicky/PataNahi';
import Button from 'elements/atoms/Button';

let x = {
  b: [1, 2, 3],
};

const Stuff = () => {
  const [, setBoolean] = useState(false);
  const [v, setArr] = useState(x.b);

  const toggle = () => {
    setBoolean(b => !b);
  };

  const change = () => {
    x.b[2] = 4;
  };

  const push = () => {
    setArr(x => [...x, 7]);
  };

  console.log(v);

  return (
    <div className="container mx-auto py-4">
      <button onClick={toggle}>toggle</button>
      <button onClick={change}>change</button>
      <button onClick={push}>push</button>
      {v}
    </div>
  );
};

// const S = {
//   Stuff,
//   // increment: () => Stuff.setCounter(c => c + 1);
// }

// const Stuff: React.FC = () => {
//   const coords = [
//     {
//       x: 0,
//       y: 0,
//     },
//     {
//       x: 30,
//       y: 50,
//     },
//     {
//       x: 80,
//       y: 100,
//     },
//     {
//       x: 30,
//       y: 50,
//     },
//   ];

//   const { v } = useSpring({
//     from: {
//       v: 0,
//     },
//     v: coords.length - 1,
//     config: {
//       duration: coords.length * 1000,
//     },
//   });

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <a.div
//         style={{
//           x: v.to(v => coords[Math.round(v)].x),
//           y: v.to(v => coords[Math.round(v)].y),
//         }}
//         className="w-32 h-32 bg-orange-500"
//       />
//     </div>
//   );
// };

// const Stuff: React.FC = () => {
//   const [big, setBig] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <button onClick={() => setBig(b => !b)}>big</button>
//       <Animate flipKey={big}>
//         <a.div className={`${big ? 'w-16 h-16' : 'w-8 h-8'} bg-gray-800`} />
//       </Animate>
//     </div>
//   );
// };

// const Stuff = () => {
//   const [right, setRight] = useState(false);

//   return (
//     <DefaultLayout pageTitle="Stuff">
//       <div className="container mx-auto pt-4">
//         <button
//           onClick={() => {
//             setRight(right => !right);
//           }}
//         >
//           switch
//         </button>

//         {/* <motion.div
//           animate
//           transition={{
//             duration: 3,
//           }}
//           className={`bg-gray-400 fixed right-0 bottom-0 mr-2 mb-2 ${
//             right ? ' w-16 h-32' : 'w-8 h-8'
//           }`}
//           style={{ transformOrigin: '50% 50%' }}
//         ></motion.div> */}

//         {/* <Flipper flipKey={right}>
//           <Flipped
//             flipId="chatwala"
//             spring={{
//               stiffness: 100,
//             }}
//           >
//             <div
//               className={`bg-gray-400 fixed right-0 bottom-0 mr-2 mb-2 ${
//                 right ? 'w-16 h-32' : 'w-8 h-8'
//               }`}
//               style={{ transformOrigin: '50% 50%' }}
//             ></div>
//           </Flipped>
//         </Flipper> */}
//         <Move
//           id="chatwala"
//           moveKey={right}
//           config={{ damping: 0.9, frequency: 3 }}
//           style={{ transformOrigin: '100% 100%' }}
//         >
//           <a.div
//             className={`bg-gray-400 fixed  right-0 bottom-0 mr-2 mb-2 ${
//               right ? 'w-16 h-32' : 'w-8 h-8'
//             }`}
//           ></a.div>
//         </Move>
//         <p>stuff</p>
//       </div>
//     </DefaultLayout>
//   );
// };

// const Stuff = () => {
//   const [right, setRight] = useState(false);

//   // const boxRef = useRef(null);
//   const { style: magicStyles, ref: boxRef } = useMove<HTMLDivElement>({
//     id: 'box',
//     // ref: boxRef,
//     key: right,
//   });

//   const style = useSpring({
//     backgroundColor: right ? 'pink' : '#bada55',
//   });

//   return (
//     <DefaultLayout pageTitle="Stuff">
//       <div className="container mx-auto pt-4">
//         <Link to="stuff2">stuff2</Link>
//         <button
//           onClick={() => {
//             setRight(right => !right);
//           }}
//         >
//           switch
//         </button>
//         <div className={`flex ${right ? 'justify-end' : ''}`}>
//           {right ? (
//             <a.div
//               ref={boxRef}
//               style={{ ...magicStyles, transformOrigin: '0% 0%', ...style }}
//               className="w-16 h-16 bg-gray-400 p-1"
//             >
//               <a.div
//                 style={{
//                   scaleY: magicStyles.scaleY.to(v => (v > 0.01 ? 1 / v : 10000)),
//                   scaleX: magicStyles.scaleX.to(v => (v > 0.01 ? 1 / v : 10000)),
//                 }}
//               >
//                 <p>stu</p>
//               </a.div>
//             </a.div>
//           ) : (
//             <a.div
//               ref={boxRef}
//               style={{ ...magicStyles, transformOrigin: '0% 0%', ...style }}
//               className="w-16 h-32 bg-gray-400 p-1"
//             >
//               <a.div
//                 style={{
//                   scaleY: magicStyles.scaleY.to(v => (v > 0.01 ? 1 / v : 10000)),
//                   scaleX: magicStyles.scaleX.to(v => (v > 0.01 ? 1 / v : 10000)),
//                 }}
//               >
//                 <p>sa</p>
//               </a.div>
//             </a.div>
//           )}
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };
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
