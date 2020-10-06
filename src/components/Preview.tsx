import React, { FC, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { StateProvider } from 'react-zoom-pan-pinch/dist/store/StateContext'
import RenderSVG from './RenderSVG';
import Switch from './Switch';

interface PreviewProps {
  original: string | undefined;
  precessed: string | undefined;
}

const Preview: FC<PreviewProps> = ({ original, precessed }) => {
  const [isProcessed, setIsProcessed] = useState(true)

  if (!original || !precessed) {
    return (
      <div className="preview-block no-selectable">
        <div className="no-file"> Please select file </div>
      </div>
    );
  }

  return (
    <div className="preview-block">
      <TransformWrapper options={{ centerContent: true }}>
        {({ zoomIn, zoomOut, setDefaultState }: StateProvider) => 
          <>
            <div className="preview-options">
              <Switch isChecked={isProcessed} onChange={setIsProcessed} />
              <div className="buttons">
                <label className="zoom-label no-selectable">Zoom:</label>
                <button className="button is-primary is-outlined" onClick={zoomIn}>+</button>
                <button className="button is-primary is-outlined" onClick={zoomOut}>-</button>
                <button className="button is-primary is-outlined" onClick={setDefaultState}>Reset</button>
              </div>
            </div>
            <TransformComponent>
              <RenderSVG svg={isProcessed ? precessed : original} />
            </TransformComponent>
          </>
        }
      </TransformWrapper>
    </div >
  );
};

export default Preview;

