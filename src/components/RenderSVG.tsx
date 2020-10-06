import React, { FC} from 'react';

const RenderSVG: FC<{ svg: string | undefined }> = ({ svg }) => (
  <>
    {!!svg
      ? <div dangerouslySetInnerHTML={{ __html: svg }} />
      : <div> Please select file </div>}
  </>
);

export default RenderSVG;
