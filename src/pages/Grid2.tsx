import React, { useState, useRef, ReactNode, FC } from 'react';

interface ParentProps {
  children: ReactNode;
}

const Parent = ({ children }: ParentProps) => {
  const routes = React.Children.toArray(children);

  console.log(routes);

  // @ts-ignore
  const haha = React.Children.map(children, c => c.type === ChildWithSuperpowers);

  console.log(haha);

  return (
    <>
      <div>yay</div>
    </>
  );
};

const Child = () => {
  return <div></div>;
};

const ChildWithSuperpowers = ({ yas = 'yass!' }: { yas?: 'yass!' }) => {
  return null;
};

const Grid2 = () => {
  const [arr, setArr] = useState([1, 2, 3, 4]);

  const changeOrder = () => {
    setArr([2, 1, 3, 4]);
  };

  return (
    <div>
      <button onClick={changeOrder}>change order</button>
      <div>nvjfvnfjvnf</div>
      <Parent>
        <Child />
        <ChildWithSuperpowers />
      </Parent>
    </div>
  );
};

export default Grid2;
