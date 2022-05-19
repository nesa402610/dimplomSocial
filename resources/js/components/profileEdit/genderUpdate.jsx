import React, {useEffect, useState} from 'react';

const GenderUpdate = ({user, handler}) => {
    const [data, setData] = useState({});
    useEffect(() => {
        setData({gender: user.gender});
    }, [user]);

    const update = (e) => {
        e.preventDefault();
        handler(data);
    };
    return (
        <div className={'flex gap-4'}>
            <label className={'flex-1'}>
                <span className={'ml-1'}>Пол</span>
                <select onChange={e => setData({gender: e.target.value})}
                        className={'mt-1'}>
                    <option selected={data.gender === 0} value={0}>Не указано</option>
                    <option selected={data.gender === 1} value={1}>Мужской</option>
                    <option selected={data.gender === 2} value={2}>Женский</option>
                </select>
            </label>
            <button onClick={update}
                    className={'flex-1 mt-7 hover:bg-slate-500'}>Обновить
            </button>
        </div>
    );
};

export default GenderUpdate;
