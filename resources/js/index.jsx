import React, {useEffect} from 'react';
import Header from "./components/header";
import {Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/login";
import Register from "./pages/register";
import './API/axios';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getUserAction, loginAction} from "./store/authReducer";
import Messenger from "./pages/messenger";

const Index = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.authed);
    useEffect(() => {
        if (localStorage.getItem('isAuth')) {
            dispatch(loginAction(true));
        }
        if (isAuth) {
            axios.get('/geloda').then(r => {
                dispatch(getUserAction(r.data));
                // console.log(r.data);
            }).catch(err => {
                localStorage.removeItem('isAuth');
                dispatch(loginAction(false));
            });
        }
    }, [isAuth]);
    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route exact path={'/id:id'} element={<Profile/>}/>
                    <Route path={'/messenger'} element={<Messenger/>}/>
                    <Route path={'/connect'} element={<Register/>}/>
                    <Route path={'/linkin'} element={<Login/>}/>
                </Routes>
            </main>
        </>
    );
};

export default Index;
