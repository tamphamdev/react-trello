import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Template from './components/Template';
import GroupList from './components/GroupList';
function App() {
  return (
    <div className="App">
    <Template>
      <GroupList/>
    </Template>
    </div>
  );
}

export default App;
