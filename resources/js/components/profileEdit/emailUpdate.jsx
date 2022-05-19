import React, {useEffect, useState} from 'react';

const EmailUpdate = ({user, handler}) => {
    const [data, setData] = useState({});
    useEffect(() => {
        setData({email: user.email});
    }, [user]);

    const update = (e) => {
        e.preventDefault();
        handler(data);
    };


    return (
        <div className={'flex gap-4'}>
            <label className={'flex-1'}>
                <span className={'ml-1'}>Email</span>
                <input className={'mt-1'}
                       type="email"
                       onChange={e => setData({email: e.target.value})}
                       value={data.email}/>
            </label>
            <button onClick={update}
                    className={'flex-1 mt-7 hover:bg-slate-500'}>Обновить
            </button>
        </div>
    );
};

export default EmailUpdate;
