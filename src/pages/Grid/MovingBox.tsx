import React, { useState, createContext } from 'react';
import { useSpring, a, SpringStartFn } from '@react-spring/web';
import { noop } from 'utils/helpers';

interface RectOptional {
  top?: number;
  left?: number;
  height?: number;
  width?: number;
}

interface Options extends RectOptional {
  from?: RectOptional;
}

interface SetPositionShape {
  (options: Options): void;
}

export interface MovingBoxContextShape {
  setPosition: SetPositionShape;
  setShow: Function;
}

export const MovingBoxContext = createContext<MovingBoxContextShape>({
  // @ts-ignore
  setPosition: noop,
  setShow: noop,
});

const MovingBox: React.FC = ({ children }) => {
  const [show, setShow] = useState(false);

  const [style, set] = useSpring(() => ({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
    config: {
      frequency: 0.3,
      damping: 1,
    },
  }));

  const setPosition: SetPositionShape = options => {
    set(options);
  };

  return (
    <MovingBoxContext.Provider value={{ setShow, setPosition }}>
      {children}
      {show && <a.div className="bg-blue-700 opacity-25 fixed" style={style} />}
    </MovingBoxContext.Provider>
  );
};

export default MovingBox;
