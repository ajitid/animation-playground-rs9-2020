import React, { useState, useMemo } from 'react';
import { a, useTrail } from '@react-spring/web';
import { VariantMap } from 'flicky/utils/variants';

const Stuff2 = () => {
  const [on, setOn] = useState(false);

  const ac = useMemo(() => {
    return on ? 'on' : 'off';
  }, [on]);

  const variants: VariantMap<'on' | 'off'> = {
    on: { opacity: 1, x: 0 },
    off: { opacity: 1, x: +100 },
  };

  const s = [1, 2, 3, 4];

  const trail = useTrail(s.length, {
    ...variants[ac],
    config: {
      frequency: 0.5,
      damping: 1,
      delay: 3000,
    },
    // delay(key) {
    //   console.log(key);
    //   return key;
    // },
  });

  return (
    <div>
      <div className="mb-3">
        <button className="px-2 py-1 bg-gray-400" onClick={() => setOn(on => !on)}>
          on/off
        </button>{' '}
        {ac}
      </div>
      <a.div>
        {trail.map((v, i) => (
          <a.div key={i} style={v} className="bg-gray-600 w-8 ml-4 h-8" />
        ))}
      </a.div>
    </div>
  );
};

// const Stuff2 = () => {
//   return (
//     <DefaultLayout pageTitle="Stuff">
//       <div className="container mx-auto pt-4">
//         <Link to="stuff">stuff1</Link>
//         <Move id="box" moveKey="2" style={{ transformOrigin: '0% 0%' }}>
//           <a.div className="w-6 h-4 bg-purple-300"></a.div>
//         </Move>
//       </div>
//     </DefaultLayout>
//   );
// };

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
