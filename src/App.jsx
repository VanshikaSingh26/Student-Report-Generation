import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ReportForm from './components/ReportForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report-form" element={<ReportForm />} />
      </Routes>
    </Router>
  );
};

export default App;