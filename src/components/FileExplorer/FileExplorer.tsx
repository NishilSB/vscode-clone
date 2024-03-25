import React, { FC, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';
import './FileExplorer.scss';

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
            isFolder: false,
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

  // const createFileTree = (files: string[]) => {
  //   let fileTree: Array<FileObject> = [];
  //   makeChildren(files);
  //   function makeChildren(files: string[]) {
  //     let tree = [];
  //     for (const filePath in files) {
  //       const element = files[filePath];
  //       const names = element.split('\\');
  //       const folder_filename = names[0];
  //       names.shift();
  //       const treeObj = {
  //         children: makeChildren(names),
  //         folderName: element,
  //         isFolder: true,
  //         isOpened: false,
  //         isSelected: false,
  //       };

  //       tree.push(treeObj);
  //       return treeObj;
  //     }
  //     console.log('final result', tree);
  //   }
  // };
  return (
    <div className="FileExplorer row-4" data-testid="FileExplorer">
      <RenderTree files={treeFiles?.children} />
    </div>
  );
};

const RenderTree = ({ files }) => {
  return (
    <div>
      <ul>
        {files?.map((d) => (
          <>
            <li>{d?.name}</li>
            <RenderTree files={d.children} />
          </>
        ))}
      </ul>
    </div>
  );
  // <li>
  //   {files?.map((d) => (
  //     <ul>{d}</ul>
  //   ))}
  // </li>;
};

export default FileExplorer;
