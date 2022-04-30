import React from 'react';
import Header from "./components/header";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

const Index = () => {
    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/connect'} element={<Register/>}/>
                    <Route path={'/linkin'} element={<Login/>}/>
                </Routes>
            </main>
        </>
    );
};

export default Index;
