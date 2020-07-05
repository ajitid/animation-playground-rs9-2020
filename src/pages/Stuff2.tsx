import React from 'react';
import { a } from '@react-spring/web';

import DefaultLayout from 'layouts/DefaultLayout';
import Link from 'elements/atoms/Link';
import Move from '../flicky/utils/move/Move';

const Stuff2 = () => {
  return (
    <DefaultLayout pageTitle="Stuff">
      <div className="container mx-auto pt-4">
        <Link to="stuff">stuff1</Link>
        <Move id="box" moveKey="2" style={{ transformOrigin: '0% 0%' }}>
          <a.div className="w-6 h-4 bg-purple-300"></a.div>
        </Move>
      </div>
    </DefaultLayout>
  );
};

// import { Flipper, Flipped } from 'react-flip-toolkit';
// const Stuff2 = () => {
//   const [right, setRight] = useState(false);

//   return (
//     <DefaultLayout pageTitle="Stuff">
//       <div className="container mx-auto pt-4">
//         <button
//           onClick={() => {
//             setRight(right => !right);
//           }}
//         >
//           flipper switch
//         </button>
//         <Flipper flipKey={right}>
//           <div className={`flex ${right && 'justify-end'}`}>
//             <Flipped flipId="box">
//               <div className="w-16 h-16 bg-gray-400" />
//             </Flipped>
//           </div>
//         </Flipper>
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

export default Stuff2;
