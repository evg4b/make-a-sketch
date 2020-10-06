import React, { FC, useEffect, useState } from 'react';
import FileSelect from './FileSelect';
import { processSvg } from '../helpers/process';
import fileSave from 'save-file'
import prettyBytes from 'pretty-bytes';
import clsx from 'clsx';

interface SidebarProps {
  onOriginalSelected(content: string): void;
  onProcessed(content: string): void;
}

const Sidebar: FC<SidebarProps> = ({ onOriginalSelected, onProcessed }) => {
  const [file, setFile] = useState<SourceFile>();
  const [svg, setSvg] = useState("");
  const [options] = useState({ fillStyle: 'solid' });

  useEffect(() => {
    if (file) {
      (async () => {
        const precessed = await processSvg(file.content, options);
        onProcessed(precessed);
        setSvg(precessed);
      })();
    }
  }, [file])

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
          <p className="no-selectable">
            Service that lets you quickly draw your svg diagram from <a href="https://www.diagrams.net/">diagrams.net</a> in a sketchy, hand-drawn-like, style. This project based on <a href="https://roughjs.com/">rough.js</a> library.
          </p>
          <FileSelect onSelect={onSelectHandler} />
          {file && (
            <div>
              <hr />
              <div className="no-selectable">
                <span>File name: </span> <b >{file.fileName}</b> ({prettyBytes(file.size)})
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="card-footer no-selectable">
        <a onClick={onSaveHandler} className={clsx("card-footer-item", { 'is-disabled': !file })}>Download</a>
      </footer>
    </div>
  )
};


export default Sidebar;

