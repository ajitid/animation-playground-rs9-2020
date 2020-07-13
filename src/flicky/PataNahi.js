import React from 'react';
import * as Rematrix from 'rematrix';
import { useSpring, interpolate } from '@react-spring/web';

const positionCache = {};

class InnerFlip extends React.Component {
  el = { current: null };

  // allow users to pass in spring set functions
  // if they want to maintain control over springs
  setVals(vals) {
    Array.isArray(this.props.flipSet)
      ? this.props.flipSet.map(set => set(vals))
      : this.props.flipSet(vals);
  }

  calculateFlip(before) {
    const startTransform = Rematrix.fromString(getComputedStyle(this.el.current).transform);
    const after = this.el.current.getBoundingClientRect();
    const scaleX = before.width / after.width;
    const scaleY = before.height / after.height;
    const x = before.left - after.left;
    const y = before.top - after.top;

    const transformsArray = [
      startTransform,
      Rematrix.translateX(x),
      Rematrix.translateY(y),
      Rematrix.scaleX(scaleX),
      Rematrix.scaleY(scaleY),
    ];

    const matrix = transformsArray.reduce(Rematrix.multiply);

    const diff = {
      x: matrix[12],
      y: matrix[13],
      scaleX: matrix[0],
      scaleY: matrix[5],
    };
    this.animate(diff);
  }

  animate(vals) {
    this.setVals(vals);
    requestAnimationFrame(() => {
      this.setVals({ x: 0, y: 0, scaleX: 1, scaleY: 1, immediate: false });
    });
  }

  componentDidMount() {
    const previousCoords = positionCache[this.props.flipId];
    if (previousCoords) {
      this.calculateFlip(previousCoords);
      delete positionCache[this.props.flipId];
    }
  }

  componentWillUnmount() {
    if (this.props.flipId) {
      positionCache[this.props.flipId] = this.el.current.getBoundingClientRect();
    }
  }

  componentDidUpdate(prevProps, prevState, before) {
    if (prevProps.flipKey === this.props.flipKey) return;
    this.calculateFlip(before);
  }

  getSnapshotBeforeUpdate(nextProps) {
    return nextProps.flipKey !== this.props.flipKey
      ? this.el.current.getBoundingClientRect()
      : '';
  }

  render() {
    try {
      const child = React.Children.only(this.props.children);
      if (!React.isValidElement(child)) return null;

      const { flipId, flipSet, flipKey, ...validElProps } = this.props;

      return React.cloneElement(child, {
        ...validElProps,
        ref: node => {
          this.el.current = node;

          const { ref } = child;
          if (ref == null) return;
          if (typeof ref === 'function') {
            ref(node);
          } else {
            ref.current = node;
          }
        },
      });
    } catch (e) {
      return null;
    }
  }
}

const AnimationHandler = props => {
  const [{ x, y, scaleX, scaleY }, set] = useSpring(() => ({
    y: 0,
    x: 0,
    scaleX: 1,
    scaleY: 1,
    config: {
      duration: 3000,
    },
    // config: {
    //   frequency: 0.3,
    //   damping: 0.9,
    // },
  }));

  const augmentedStyle = {
    ...props.style,
    transformOrigin: '0 0',
    transform: interpolate([x, y, scaleX, scaleY], (x, y, scaleX, scaleY) => {
      return `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`;
    }),
  };
  return <InnerFlip {...props} flipSet={set} style={augmentedStyle} />;
};

const OuterFlip = props => {
  if (props.flipSet) return <InnerFlip {...props} />;
  return <AnimationHandler {...props} />;
};

export default OuterFlip;
