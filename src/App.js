
import './App.css';
import NewsCard from './component/news/NewsCard';



function App() {
  let API = '765b180b355145218e0a6f22b8160a1a'
  return (
    <>

      <div className="App">
        < NewsCard pageSize={100} apiKey={API} />
      </div>

    </>
  );
}

export default App;
