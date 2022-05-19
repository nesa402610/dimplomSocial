import React, {useState} from 'react';

const PasswordUpdate = ({handler}) => {
    const [data, setData] = useState({
        password: '',
        password_confirmation: ''
    });

    const update = (e) => {
        e.preventDefault();
        if (data.password && data.password_confirmation) {
            handler(data);
        }
    };
    return (
        <div>
            <h2 className={'ml-1 text-lg'}>Смена пароля</h2>
            <div className={'flex gap-4'}>
                <label className={'flex-1'}>
                    <span className={'ml-1'}
                    >Текущий пароль</span>
                    <input className={'mt-1'}
                           onChange={e => setData({...data, password: e.target.value})}
                           required
                           type="password"/>
                </label>
                <label className={'flex-1'}>
                    <span className={'ml-1'}>Новый пароль</span>
                    <input className={'mt-1'}
                           onChange={e => setData({...data, password_confirmation: e.target.value})}
                           required
                           type="password"/>
                </label>
                <button className={'flex-1 mt-7 hover:bg-slate-500'}
                        onClick={update}>Обновить
                </button>
            </div>
        </div>
    );
};

export default PasswordUpdate;
