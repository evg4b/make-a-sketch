import React, { FC, useState } from 'react';
import clsx from 'clsx';
import RenderSVG from './RenderSVG';

interface PreviewProps {
  original: string | undefined;
  precessed: string | undefined;
}

const Preview: FC<PreviewProps> = ({ original, precessed }) => {
  const [isOriginal, setIsOriginal] = useState(false)

  return (
    <div className="box preview">
      <div className="tabs is-centered">
        <ul>
          <li className={clsx({ "is-active": !isOriginal })}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={() => setIsOriginal(false)}>Processed</a>
          </li>
          <li className={clsx({ "is-active": isOriginal })}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={() => setIsOriginal(true)}>Original</a>
          </li>
        </ul>
      </div>
      <div className="preview-block">
        {isOriginal ? <RenderSVG svg={original} /> : <RenderSVG svg={precessed} />}
      </div>
    </div>
  );
};

export default Preview;

