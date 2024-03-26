import React, { FC, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';
import './FileExplorer.scss';
import Folder from './Folder/Folder';

interface FileExplorerProps {}
interface FileObject {
  name: String;
  isSelected: Boolean;
  isOpened: Boolean;
  isFolder: Boolean;
  children: FileObject[];
}
const FileExplorer: FC<FileExplorerProps> = () => {
  const [files, setFiles] = useState<string[]>();
  const [treeFiles, setTreeFiles] = useState<FileObject>();
  useEffect(() => {
    getFilesAndFolders();
  }, []);

  const getFilesAndFolders = async () => {
    const response: string[] = await invoke('get_files_and_folders');
    console.log('Files and folders:', response);
    const fileTree = constructTree(response);
    setTreeFiles(fileTree);
    console.log(fileTree);
    setFiles(response);
  };

  function constructTree(folders: string[]) {
    // Create a root node for the tree
    const rootNode: FileObject = {
      name: '',
      children: [],
      isFolder: false,
      isOpened: false,
      isSelected: false,
    };

    // Process each folder path
    folders.forEach((folderPath) => {
      const pathParts = folderPath.split('\\'); // Split path into parts
      let currentNode = rootNode;

      // Iterate through each part of the path, creating nodes as needed
      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        const childNode = currentNode.children.find(
          (node) => node.name === part
        );

        if (!childNode) {
          // Create a new child node if it doesn't exist
          const newNode = {
            name: part,
            children: [],
            isFolder: !part.includes('.'),
            isOpened: false,
            isSelected: false,
          };
          currentNode.children.push(newNode);
          currentNode = newNode;
        } else {
          // Move down to the existing child node
          currentNode = childNode;
        }
      }
    });

    return rootNode;
  }

  return (
    <div
      className="FileExplorer vh-100 overflow-auto"
      data-testid="FileExplorer"
    >
      <RenderTree files={treeFiles?.children} />
    </div>
  );
};

const RenderTree = ({ files }) => {
  const [expanded, setExpanded] = useState(false);
  const onFolderFileClick = () => {
    setExpanded((pre) => !pre);
  };
  return (
    <div>
      <ul className="p-0">
        {files?.map(({ name, children, isFolder }) => (
          <>
            <li className="list-unstyled" onClick={onFolderFileClick}>
              <Folder name={name} expanded={expanded} isFolder={isFolder} />
            </li>
            <div className="pl-5">
              {expanded && <RenderTree files={children} />}
            </div>
          </>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
