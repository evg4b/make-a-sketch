import React, { FC, useEffect, useState } from 'react';
import FileInput, { SourceFile } from './components/FIleInput';
import { processSvg } from './helpers/process';
import fileSave from 'save-file'
import prettyBytes from 'pretty-bytes';
import clsx from 'clsx';

interface SidebarProps {
  onOriginalSelected(content: string): void;
  onProcessed(content: string): void;
}

const Sidebar: FC<SidebarProps> = ({ onOriginalSelected, onProcessed }) => {
  const [file, setFile] = useState<SourceFile>();
  const [svg, setSvg] = useState("")

  useEffect(() => {
    if (file) {
      (async () => {
        const precessed = await processSvg(file.content);
        onProcessed(precessed);
        setSvg(precessed);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  const onSelectHandler = (file: SourceFile) => {
    onOriginalSelected(file.content);
    setFile(file);
  }

  const onSaveHandler = async () => {
    await fileSave(svg, file?.fileName || 'precessed.svg')
  }

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          MAKE A SKETCH <span className="tag is-danger">BETA</span>
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          <p>
            Service for quickly converting your <span>.svg</span> files using <a href="https://roughjs.com/">rough.js</a>.
          </p>
          <FileInput onSelect={onSelectHandler} />
          {file && (
            <div>
              <hr />
              <div><span>File name: </span> {file.fileName}</div>
              <div><span>File size: </span> {prettyBytes(file.size)}</div>
            </div>
          )}
        </div>
      </div>
      <footer className="card-footer">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a onClick={onSaveHandler} className={clsx("card-footer-item", { 'is-disabled': !file })}>Download</a>
      </footer>
    </div>
  )
};


export default Sidebar;

