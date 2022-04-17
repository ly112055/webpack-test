import React from 'react';
import ReactDom from 'react-dom';
import './assets/styles/index.less';

const App = () => {
  return (
    <div>
      <div className="style1">react-react-7887878</div>
      <img src="./assets/images/1.jpg" />
    </div>
  );
};

export default App;

ReactDom.createRoot(document.getElementById('app')).render(<App />);
