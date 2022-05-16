import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";

const Search = () => {
    const [users, setUsers] = useState('');

    useEffect(() => {
        axios.get('/systems/useall').then(r => setUsers(r.data));
    }, []);
    return (
        <div className={'px-4 text-slate-300 mt-4'}>
            <div className={'flex flex-col gap-4'}>
                {(users)
                    ?
                    users.map((user) =>
                        <NavLink to={'/id' + user.id} className={'flex gap-4 p-2 rounded-md border-2 bg-gray-700 border-slate-800'}>
                            <div className={'h-20 w-20 rounded-full overflow-hidden'}>
                                <img src={user.photo} alt=""/>
                            </div>
                            <div>
                                <div>
                                    {user.name} {user.lastname}
                                </div>
                            </div>
                        </NavLink>
                    ) : ''}
            </div>
        </div>
    );
};

export default Search;
