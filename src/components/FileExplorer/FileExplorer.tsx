import React, { FC, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';
import './FileExplorer.scss';

interface FileExplorerProps {}

const FileExplorer: FC<FileExplorerProps> = () => {
  const [files, setFiles] = useState<[String]>();
  useEffect(() => {
    getFilesAndFolders();
  }, []);

  const getFilesAndFolders = async () => {
    const response: [String] = await invoke('get_files_and_folders');
    console.log('Files and folders:', response);
    setFiles(response);
  };
  return (
    <div className="FileExplorer" data-testid="FileExplorer">
      <li>
        {files?.map((d) => (
          <ul>{d}</ul>
        ))}
      </li>
    </div>
  );
};

export default FileExplorer;
