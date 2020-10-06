import React, { FC } from 'react';

interface SwitchProps {
  isChecked: boolean;
  onChange(checked: boolean): void;
}

const Switch: FC<SwitchProps> = ({ isChecked, onChange }) => {
  return (
    <div className="field switch" onClick={() => onChange(!isChecked)}>
      <label className="left no-selectable">Original</label>
      <input type="checkbox" onChange={() => onChange(!isChecked)} className="switch is-rounded" checked={isChecked} />
      <label className="right no-selectable">Precessed</label>
    </div>
  )
}

export default Switch;
