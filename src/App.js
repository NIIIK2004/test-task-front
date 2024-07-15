import React, { lazy, Suspense } from 'react';

import './App.css';
import './assets/css/global.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Auth = lazy(() => import('./components/Auth/Auth'));
const Home = lazy(() => import('./components/Home/Home'));
const Reg = lazy(() => import('./components/Auth/Registration'));
const AddCabinetForm = lazy(() => import('./components/ListСabinets/admin/AddCabinetForm'));
const CabinetDetails = lazy(() => import('./components/CabinetDetails/CabinetDetails'));
const Loading = () => <p className="loading"><span class="loader"></span>Загрузка...</p>;

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/reg' element={<Reg />} />
          <Route path="/wardrobe/:id" element={<CabinetDetails />} />
          <Route path="/addCabinetForm" element={<AddCabinetForm />} />
          <Route path="/wardrobe/edit/:id" element={<AddCabinetForm />} />
        </Routes>
      </Suspense>
    </Router>
  );
}