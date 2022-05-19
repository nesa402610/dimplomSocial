import React, {useEffect, useState} from 'react';

const PhoneUpdate = ({user, handler}) => {
    const [data, setData] = useState({});
    useEffect(() => {
        setData({phone: user.phone});
    }, [user]);

    const update = (e) => {
        e.preventDefault();
        handler(data);
    };
    return (
        <div className={'flex gap-4'}>
            <label className={'flex-1'}>
                <span className={'ml-1'}>Номер телефона</span>
                <input className={'mt-1'}
                       onChange={e => setData({phone: e.target.value})}
                       type="text"
                       value={data.phone}/>

            </label>
            <button className={'flex-1 mt-7 hover:bg-slate-500'}
                    onClick={update}>Обновить
            </button>
        </div>
    );
};

export default PhoneUpdate;
