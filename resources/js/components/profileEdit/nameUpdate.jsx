import React, {useEffect, useState} from 'react';

const NameUpdate = ({user, handler}) => {
    const [data, setData] = useState({});
    useEffect(() => {
        setData({name: user.name, lastname: user.lastname});
    }, [user]);

    const update = (e) => {
        e.preventDefault();
        handler(data);
    };
    return (
        <div className={'flex gap-4'}>
            <label className={'flex-1'}>
                <span className={'ml-1'}>Имя</span>
                <input className={'mt-1'}
                       type="text"
                       onChange={e => setData({...data, name: e.target.value})}
                       value={data.name}/>
            </label>
            <label className={'flex-1'}>
                <span className={'ml-1'}>Фамилия</span>
                <input className={'mt-1'}
                       type="text"
                       onChange={e => setData({...data, lastname: e.target.value})}
                       value={data.lastname}/>
            </label>
            <button className={'flex-1 mt-7 hover:bg-slate-500'}
                    onClick={update}>Обновить
            </button>
        </div>
    );
};

export default NameUpdate;
