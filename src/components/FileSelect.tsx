import React, { FC } from 'react';
import FileReaderInput from 'react-file-reader-input';

interface FileInputProps {
  onSelect(file: SourceFile): void;
}

const FileSelect: FC<FileInputProps> = ({ onSelect }) => (
  <div className="file has-name is-fullwidth ">
    <FileReaderInput className="input-wrapper" accept=".svg" as="text" onChange={(_, files) => {
      const [event, file] = files[0];
      onSelect({
        content: (event.target as any).result,
        size: file.size,
        fileName: file.name,
      })
    }}>
      <button className="button is-primary is-fullwidth">Select .svg file</button>
    </FileReaderInput>
  </div>
);

export default FileSelect;
