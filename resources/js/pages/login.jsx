import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {loginAction} from "../store/authReducer";
import {Helmet} from "react-helmet";

const Login = () => {
    const authUser = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    const login = (e) => {
        e.preventDefault();
        axios.post('/auth', data).then(r => {
            dispatch(loginAction({authed: true, user: r.data.user}));
            localStorage.setItem('isAuth', 'true');
            navigate('/id' + r.data.user.id);
        }).catch(err => {
            console.log(err);
        });
    };
    useEffect(() => {
        if (authUser.id) {
            navigate('/id' + authUser.id);
        }
    },[authUser]);
    return (
        <div className={'px-4 py-2'}>
            <Helmet>
                <title>Вход в аккаунт</title>
            </Helmet>
            <h2 className={'text-slate-100 text-3xl text-center font-bold mb-8'}>Вход в аккаунт</h2>
            <form onSubmit={e => login(e)} className={'flex-col flex gap-3'}>
                <label>
                    <span className="block text-sm font-medium text-slate-300">Email </span>
                    <input type="email"
                           name="email"
                           required
                           onChange={e => setData({...data, email: e.target.value})}
                           className="mt-1 px-3 py-2 bg-slate-700 border shadow-sm border-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 text-slate-100"
                           placeholder="you@example.com"/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-300">Password</span>
                    <input type="password"
                           required
                           name="password"
                           onChange={e => setData({...data, password: e.target.value})}
                           className="mt-1 px-3 py-2 bg-slate-700 border shadow-sm border-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 text-slate-100"
                           placeholder="password"/>
                </label>
                <div className={'flex justify-between text-slate-300'}>
                    <Link to={'/connect'} className={'cursor-pointer hover:text-slate-400 transition duration-200'}>
                        Еще нет аккаунта?
                    </Link>
                    <Link to={'/pareset'} className={'cursor-pointer hover:text-slate-400 transition duration-200'}>
                        Я забыл пароль
                    </Link>
                </div>
                <input type={"submit"}
                       className={'w-full p-1.5 bg-pink-300 rounded-full hover:bg-pink-400 transition duration-200'}
                       value={"Войти"}
                />
            </form>
        </div>
    );
};

export default Login;
