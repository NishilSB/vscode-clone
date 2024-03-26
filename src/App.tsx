import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { invoke } from '@tauri-apps/api/tauri';
import './App.scss';
import FileExplorer from './components/FileExplorer/FileExplorer';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }));
  }

  return (
    <div className="container-fluid vh-100 overflow-auto">
      <div className="row">
        <div className="col-2">
          <FileExplorer />
        </div>
        <div className="col-10"></div>
      </div>
    </div>
  );
}

export default App;
