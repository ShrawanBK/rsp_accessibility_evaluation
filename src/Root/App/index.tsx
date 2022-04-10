import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ScanForm from '../../components/forms/ScanForm';
import Sidebar from '../../components/Sidebar';
import Test from '../../components/Test';

import './styles.css';

function App() {
    return (
        <div className="App">
            <aside className="side-content">
                <Sidebar />

            </aside>
            <main className="main-content">
                <Routes>
                    <Route path="/scan_website" element={<ScanForm />} />
                    <Route path="/saved_scans" element={<Test />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
