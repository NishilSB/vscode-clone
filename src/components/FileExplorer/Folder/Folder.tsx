import React, { FC } from 'react';
import './Folder.scss';

interface FolderProps {}

const Folder: FC<FolderProps> = () => (
  <div className="Folder" data-testid="Folder">
    Folder Component
  </div>
);

export default Folder;
