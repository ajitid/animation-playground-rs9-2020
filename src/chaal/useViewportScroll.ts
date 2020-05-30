import { useEffect } from 'react';
import { useScroll } from 'react-use-gesture';
import { Handler, UseScrollConfig } from 'react-use-gesture/dist/types';

const useViewportScroll = <Config extends UseScrollConfig & {}>(
  handler: Handler<'scroll'>,
  config?: Omit<Config, 'domTarget'>
) => {
  let scrollConfig = {
    domTarget: window,
  };

  if (config) {
    scrollConfig = { ...config, ...scrollConfig };
  }

  const scrollBind = useScroll(handler, scrollConfig);

  useEffect(scrollBind, [scrollBind]);

  return scrollBind;
};

export default useViewportScroll;
