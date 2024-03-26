import React, { FC } from 'react';
import './Folder.scss';
import angle_small_down from '../../../assets/icons/angle-small-down.svg';
import angle_small_right from '../../../assets/icons/angle-right.svg';

interface FolderProps {
  name: string;
  expanded: boolean;
  isFolder: boolean;
}

const Folder: FC<FolderProps> = ({ name, expanded, isFolder }) => (
  <div
    className="Folder d-flex align-items-center justify-content-start button"
    data-testid="Folder"
  >
    {isFolder && (
      <>
        {expanded ? (
          <img src={angle_small_down} width={20} height={20} />
        ) : (
          <img src={angle_small_right} width={15} height={15} />
        )}
      </>
    )}
    <div className="single-line pl-2">{name}</div>{' '}
  </div>
);

export default Folder;
