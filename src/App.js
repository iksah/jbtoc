import './App.css';
import { TableOfContents } from './components/TableOfContents/TableOfContents';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        TOC Demo
      </header>
      <main className="App-main">
        <TableOfContents
          contentsUrl={'/toc.json'}
        ></TableOfContents>
      </main>
    </div>
  );
}

export default App;
