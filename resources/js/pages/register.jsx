import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";

const Register = () => {
    const authUser = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const [regData, setRegData] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });
    const [error, setError] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
    });
    const createAcc = (e) => {
        e.preventDefault();
        axios.post('creac', regData).then(r => {
            navigate('/linkin');
        }).catch(err => {
            setError(err.response.data.errors);
        });
        console.log(regData, 'log');
    };
    useEffect(() => {
        if (authUser.id) {
            navigate('/id' + authUser.id);
        }
    },[authUser]);
    return (
        <div className={'px-4 py-2'}>
            <Helmet>
                <title>Создание аккаунта</title>
            </Helmet>
            <h2 className={'text-slate-100 text-3xl text-center font-bold mb-8'}>Вход в аккаунт</h2>
            <form onSubmit={e => createAcc(e)} className={'flex-col flex gap-3'}>
                <label>
                    <span className="block text-sm font-medium text-slate-300">Имя </span>
                    <input type="text"
                           required
                           name="name"
                           onChange={event => setRegData({...regData, name: event.target.value})}
                           className="mt-1 px-3 py-2 bg-slate-700 border shadow-sm border-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 text-slate-100"
                           placeholder="Изя"/>
                    {error
                        ?
                        <div className="text-red-500 text-sm mt-1">{error.name}</div>
                        : ''
                    }
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-300">Фамилия </span>
                    <input type="text"
                           required
                           name="lastname"
                           onChange={event => setRegData({...regData, lastname: event.target.value})}
                           className="mt-1 px-3 py-2 bg-slate-700 border shadow-sm border-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 text-slate-100"
                           placeholder="Ибрагимов"/>
                    {error
                        ?
                        <div className="text-red-500 text-sm mt-1">{error.lastname}</div>
                        : ''
                    }
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-300">Email </span>
                    <input type="email"
                           required
                           name="email"
                           onChange={event => setRegData({...regData, email: event.target.value})}
                           className="mt-1 px-3 py-2 bg-slate-700 border shadow-sm border-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 text-slate-100"
                           placeholder="you@example.com"/>
                    {error
                        ?
                        <div className="text-red-500 text-sm mt-1">{error.email}</div>
                        : ''
                    }
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-300">Номер телефона </span>
                    <input type="phone"
                           required
                           name="phone"
                           onChange={event => setRegData({...regData, phone: event.target.value})}
                           className="mt-1 px-3 py-2 bg-slate-700 border shadow-sm border-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 text-slate-100"
                           placeholder="0123456789"/>
                    {error
                        ?
                        <div className="text-red-500 text-sm mt-1">{error.phone}</div>
                        : ''
                    }
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-300">Пароль</span>
                    <input type="password"
                           required
                           name="password"
                           onChange={event => setRegData({...regData, password: event.target.value})}
                           className="mt-1 px-3 py-2 bg-slate-700 border shadow-sm border-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 text-slate-100"
                    />
                    {error
                        ?
                        <div className="text-red-500 text-sm mt-1">{error.password}</div>
                        : ''
                    }
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-300">Подтверждение пароля</span>
                    <input type="password"
                           required
                           name="password_confirmation"
                           onChange={event => setRegData({...regData, password_confirmation: event.target.value})}
                           className="mt-1 px-3 py-2 bg-slate-700 border shadow-sm border-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 text-slate-100"
                    />
                </label>
                <div className={'flex justify-between text-slate-300'}>
                    <Link to={'/linkin'} className={'cursor-pointer hover:text-slate-400 transition duration-200'}>
                        Уже есть аккаунт?
                    </Link>
                </div>
                <input type={"submit"}
                       className={'w-full p-1.5 bg-pink-300 rounded-full hover:bg-pink-400 transition duration-200'}
                       value={'Зарегистрироваться'}/>
            </form>
        </div>
    );
};

export default Register;
