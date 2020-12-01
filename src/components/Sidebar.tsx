import React, { FC, useEffect, useState } from 'react';
import FileSelect from './FileSelect';
import { processSvg } from '../helpers/process';
import fileSave from 'save-file'
import prettyBytes from 'pretty-bytes';
import clsx from 'clsx';
import TransformationSettings from './TransformationSettings/TransformationSettings';
import { Options } from 'roughjs/bin/core';

interface SidebarProps {
  onOriginalSelected(content: string): void;
  onProcessed(content: string): void;
}

const Sidebar: FC<SidebarProps> = ({ onOriginalSelected, onProcessed }) => {
  const [file, setFile] = useState<SourceFile>();
  const [svg, setSvg] = useState("");
  const [options, setOptions] = useState<Options>({
    maxRandomnessOffset: 2,
    roughness: 1,
    bowing: 1,
    // stroke: '#000',
    strokeWidth: 1,
    curveTightness: 0,
    curveFitting: 0.95,
    curveStepCount: 9,
    fillStyle: 'hachure',
    fillWeight: -1,
    hachureAngle: -41,
    hachureGap: -1,
    dashOffset: -1,
    dashGap: -1,
    zigzagOffset: -1,
    seed: 0,
    combineNestedSvgPaths: false,
    disableMultiStroke: false,
    disableMultiStrokeFill: false
  });

  const applyFileChanges = async () => {
    if (file) {
      const precessed = await processSvg(file.content, options);
      onProcessed(precessed);
      setSvg(precessed);
    }
  }

  useEffect(() => {
    applyFileChanges()
  }, [file, options])

  const onSelectHandler = (file: SourceFile) => {
    onOriginalSelected(file.content);
    setFile(file);
  }

  const onSaveHandler = async () => {
    await fileSave(svg, file?.fileName || 'precessed.svg')
  }

  return (
    <div className="card sidebar">
      <header className="card-header">
        <p className="card-header-title no-selectable">
          Make a sketch <span className="tag is-danger">BETA</span>
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          {!file && (
            <p className="no-selectable">
              Service that lets you quickly draw your svg diagram from <a href="https://www.diagrams.net/">diagrams.net</a> in a sketchy, hand-drawn-like, style. This project based on <a href="https://roughjs.com/">rough.js</a> library.
            </p>
          )}
          <FileSelect onSelect={onSelectHandler} />
        </div>
      </div>
      {file && (
        <>
          <div className="card-content file-info">
            <div className="content">
              <div>
                <div className="no-selectable">
                  <span>File name: </span> <b >{file.fileName}</b> ({prettyBytes(file.size)})
              </div>
              </div>
            </div>
          </div>
          <div className="card-content options">
            <div className="content">
              <TransformationSettings options={options} onSettingsChanged={setOptions} />
            </div>
          </div>
        </>
      )}
      <footer className="card-footer no-selectable">
        <a onClick={onSaveHandler} className={clsx("card-footer-item", { 'is-disabled': !file })}>Download</a>
      </footer>
    </div>
  )
};


export default Sidebar;

