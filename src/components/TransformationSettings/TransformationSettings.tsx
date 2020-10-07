import React, { FC } from 'react';
import { Options } from 'roughjs/bin/core';
import NumberOption from './NumberOption';

interface TransformationSettingsProps {
  options: Options;
  onSettingsChanged(options: Options): void;
}

const TransformationSettings: FC<TransformationSettingsProps> = ({ onSettingsChanged, options }) => {

  const update = (key: keyof Options, value: string | number) => {
    console.log(key, value)
    onSettingsChanged({ ...options, [key]: value });
  }

  return (
    <>
      <div className="field is-horizontal">
        <label className="label">Fill style</label>
        <div className="control">
          <div className="select">
            <select value={options.fillStyle} onChange={x => update('fillStyle', x.target.value)}>
              <option value="hachure" >hachure (default)</option>
              <option value="solid" >solid</option>
              <option value="zigzag" >zigzag</option>
              <option value="cross-hatch" >Cross hatch</option>
              <option value="dots" >dots</option>
              <option value="sunburst" >sunburst</option>
              <option value="dashed" >dashed</option>
              <option value="zigzag-line" >Zigzag line</option>
            </select>
          </div>
        </div>
      </div>
      <NumberOption property="fillWeight" options={options} label="Fill weight" update={update} />
      <NumberOption property="bowing" options={options} label="Bowing" update={update} />
      <NumberOption property="roughness" options={options} label="roughness" update={update} />
      <NumberOption property="strokeWidth" options={options} label="Stroke width" update={update} />
      <NumberOption property="maxRandomnessOffset" options={options} label="Max randomness offset" update={update} />
      <NumberOption property="curveFitting" options={options} label="Curve fitting" update={update} />
      <NumberOption property="curveTightness" options={options} label="Curve tightness" update={update} />
      <NumberOption property="curveStepCount" options={options} label="Curve step count" update={update} />
      <NumberOption property="hachureAngle" options={options} label="Hachure angle" update={update} />
      <NumberOption property="hachureGap" options={options} label="Hachure gap" update={update} />
      <NumberOption property="simplification" options={options} label="Simplification" update={update} />
      <NumberOption property="dashOffset" options={options} label="Dash offset" update={update} />
      <NumberOption property="dashGap" options={options} label="Dash gap" update={update} />
      <NumberOption property="zigzagOffset" options={options} label="Zigzag offset" update={update} />
      <NumberOption property="seed" options={options} label="Seed" update={update} />
      <NumberOption property="strokeLineDashOffset" options={options} label="Stroke line dash offset" update={update} />
      <NumberOption property="fillLineDashOffset" options={options} label="Fill line dash offset" update={update} />
    </>
  );
};

export default TransformationSettings;
