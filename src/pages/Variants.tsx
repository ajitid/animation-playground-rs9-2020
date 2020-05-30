import React, { useState } from 'react';
import { a as ani, useSpring, config as configPresets } from '@react-spring/web';

import DefaultLayout from 'layouts/DefaultLayout';

export enum MoveVariant {
  DisplaceNear = 'Displace near',
  DisplaceFar = 'Displace far',
}

export type VariantMap<T extends string | number | symbol> = { [key in T]: any };

const Variants = () => {
  const [variant, setVariant] = useState<MoveVariant>(MoveVariant.DisplaceNear);
  const config = { ...configPresets.wobbly };
  const variants: VariantMap<MoveVariant> = {
    [MoveVariant.DisplaceNear]: {
      x: 40,
      config: {
        ...configPresets.gentle,
      },
    },
    [MoveVariant.DisplaceFar]: {
      x: 120,
    },
  };

  const styles = useSpring({
    ...variants[variant],
    from: { x: 0 },
    loop: { reverse: true },
    config: {
      ...config,
      ...variants[variant].config,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as MoveVariant;
    setVariant(value);
  };
  const choices = Object.values(MoveVariant).map(v => (
    <label className="mr-3">
      <input
        type="radio"
        key={v}
        name="choice"
        value={v}
        checked={v === variant}
        onChange={handleChange}
        className="mr-1"
      />
      {v}
    </label>
  ));

  return (
    <DefaultLayout pageTitle="From state">
      <div className="container mx-auto pt-4">
        <div>{choices}</div>
        <ani.div style={styles} className="inline-block w-64 h-64">
          I like to move it move it
        </ani.div>
      </div>
    </DefaultLayout>
  );
};

export default Variants;
