import React, { FC } from 'react';

const RenderSVG: FC<{ svg: string }> = ({ svg }) => (
  <div dangerouslySetInnerHTML={{ __html: svg }} />
);

export default RenderSVG;
