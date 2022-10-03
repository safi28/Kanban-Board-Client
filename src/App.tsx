import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Comments from './layouts/Comments';
import Tasks from './layouts/Tasks';
import Login from './components/Login/Login';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/comments/:category/:id' element={<Comments />} />
        </Routes>
    );
}

export default App;
