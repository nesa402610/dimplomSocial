import React, {useEffect, useState} from 'react';

const BirthdayUpdate = ({user, handler}) => {
    const [data, setData] = useState({});
    useEffect(() => {
        setData({birthday: user.birthday});
    }, [user]);

    const update = (e) => {
        e.preventDefault();
        handler(data);
    };
    return (
        <div className={'flex gap-4'}>
            <label className={'flex-1'}>
                <span className={'ml-1'}>День рождения</span>
                <input className={'mt-1'}
                       onChange={e => setData({birthday: e.target.value})}
                       type="date"
                       value={data.birthday}/>
            </label>
            <button className={'flex-1 mt-7 hover:bg-slate-500'}
                    onClick={update}>Обновить
            </button>
        </div>
    );
};

export default BirthdayUpdate;
