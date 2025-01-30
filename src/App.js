import { Container} from '@mui/material';
import './App.css';
import Header from './Component/Header/Header';
import SimpleBottomNavigation from './Component/MainBottomNav';
import {BrowserRouter, Route , Routes} from 'react-router-dom';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Search from './Pages/Search/Search';
import Series from './Pages/Series/Series';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <div className="App">
      <Container>
      <Routes>
        <Route path='/' Component={Trending} exact />
        <Route path='/movies' Component={Movies}/>
        <Route path='/series' Component={Series}/>
        <Route path='/search' Component={Search}/>
      </Routes>
      </Container>
    </div>
    <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
