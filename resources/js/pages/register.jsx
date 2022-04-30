import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [regData, setRegData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const createAcc = (e) => {
        e.preventDefault();
        axios.post('creac', regData).then(r => {
            console.log(r.data, 'resp');
        }).catch(err => {
            console.log(err.data, 'err');
        });
        console.log(regData, 'log');
    };
    return (
        <div className={'px-4 py-2'}>
            <h2 className={'text-slate-100 text-3xl text-center font-bold mb-8'}>Вход в аккаунт</h2>
            <form onSubmit={e => createAcc(e)} className={'flex-col flex gap-3'}>
                <label>
                    <span className="block text-sm font-medium text-slate-300">Имя </span>
                    <input type="text"
                           required
                           name="firstname"
                           onChange={event => setRegData({...regData, firstname: event.target.value})}
                           className="mt-1 px-3 py-2 bg-slate-700 border shadow-sm border-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 text-slate-100"
                           placeholder="Изя"/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-300">Фамилия </span>
                    <input type="text"
                           required
                           name="lastname"
                           onChange={event => setRegData({...regData, lastname: event.target.value})}
                           className="mt-1 px-3 py-2 bg-slate-700 border shadow-sm border-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 text-slate-100"
                           placeholder="Ибрагимов"/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-300">Email </span>
                    <input type="email"
                           required
                           name="email"
                           onChange={event => setRegData({...regData, email: event.target.value})}
                           className="mt-1 px-3 py-2 bg-slate-700 border shadow-sm border-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 text-slate-100"
                           placeholder="you@example.com"/>
                </label>
                <label>
                    <span className="block text-sm font-medium text-slate-300">Пароль</span>
                    <input type="password"
                           required
                           name="password"
                           onChange={event => setRegData({...regData, password: event.target.value})}
                           className="mt-1 px-3 py-2 bg-slate-700 border shadow-sm border-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 text-slate-100"
                    />
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
