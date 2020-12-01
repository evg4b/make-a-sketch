import React, { FC } from 'react';
import { Options } from 'roughjs/bin/core';

interface TransformationSettingsProps {
  options: Options;
  property: keyof Options;
  label: string;
  update(key: keyof Options, value: number): void;
  min?: number;
  max?: number;
}

const NumberOption: FC<TransformationSettingsProps> = ({ options, property, update, label, min, max }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input type="range"
        className="slider is-fullwidth"
        step={0.1}
        min={min}
        onChange={x => update(property, Number(x.target.value))}
        max={max}
        value={options[property] as number || 0} />
    </div>
  </div>
);

export default NumberOption;
