import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";

const Search = () => {
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    useEffect(() => {
        axios.get('/systems/useall').then(r => {
            setUsers(r.data);
        });
    }, []);
    const filtered = users.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()));
    return (
        <div className={'flex flex-col px-4 text-slate-300 mt-4 gap-4'}>
            <div>
                <input type="text" value={searchValue}
                       placeholder={'Кого-то ищешь?'}
                       onChange={e => setSearchValue(e.target.value)}/>
            </div>
            <div className={'flex flex-col gap-4'}>
                {filtered.map((user) =>
                    <NavLink to={'/id' + user.id}
                             key={user.id}
                             className={'flex gap-4 p-2 rounded-md border-2 bg-gray-700 border-slate-800'}>
                        <div className={'h-20 w-20 rounded-full overflow-hidden'}>
                            <img src={user.photo} alt=""/>
                        </div>
                        <div>
                            <div>
                                {user.name} {user.lastname}
                            </div>
                        </div>
                    </NavLink>

                    )}
            </div>
        </div>
    );
};

export default Search;
