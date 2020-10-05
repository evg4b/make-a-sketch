import React, { FC, useState } from 'react';
import clsx from 'clsx';

interface PreviewProps {
  original: string | null;
  precessed: string | null;
}

const Render: FC<{ exists: boolean }> = ({ exists, children }) => (
  <>
    {!exists ? <div> Please select file </div> : children}
  </>
)

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
        {isOriginal
          ? <Render exists={!!original}><div dangerouslySetInnerHTML={{ __html: original! }}></div></Render>
          : <Render exists={!!precessed}><div dangerouslySetInnerHTML={{ __html: precessed! }}></div></Render>}
      </div>
    </div>
  );
};

export default Preview;

