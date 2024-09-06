import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import History from './pages/History/History';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/setup-history" element={<History />}/>
    </Routes>
  );
}

export default App;
