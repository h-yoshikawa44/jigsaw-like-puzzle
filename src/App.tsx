import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Puzzle from 'containers/pages/Puzzle';
import Policy from 'containers/pages/Policy';

const AppRoute: FC = () => (
  <Routes>
    <Route path="/policy" element={<Policy />} />
    <Route path="/" element={<Puzzle />} />
  </Routes>
);

const App: FC = () => (
  <BrowserRouter>
    <AppRoute />
  </BrowserRouter>
);

export default App;
