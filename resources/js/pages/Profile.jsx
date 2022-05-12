import React, {useEffect, useState} from 'react';
import img from '../components/placeholder/profile.png';
import {useSelector} from "react-redux";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState({});
    const authUser = useSelector(state => state.auth.user);
    const [isChanging, setChange] = useState(false);
    const [status, setStatus] = useState(user.status);
    const navigate = useNavigate();


    let userID = useParams();
    useEffect( () => {
        if (authUser.id == userID.id) {
            setUser(authUser);
            console.log(1);
        } else {
            axios.post(`/id${userID.id}`)
                .then(r => {
                    setUser(r.data.user);
                });
        }
    }, [userID]);

    const statusHandler = (e) => {
        setChange(true);
        setStatus(user.status);

    };
    const keyPressHandle = (e) => {
        if (e.key === 'Enter') {
            let oldStatus = user.status;
            setChange(false);
            user.status = status;
            axios.post('/profile/update/status', {status}).catch(err => {
                user.status = oldStatus;
            });
        }
    };
    const startDialogue = (e) => {
        e.preventDefault();
        axios.post('/action/startDialogue', {userID: userID.id});
        navigate('/messenger', {state: userID.id});
    };
    return (
        <div className={'px-4 py-2 mt-2 flex flex-col gap-4'}>
            <div className={'flex gap-4 '}>
                <div className={'rounded-full w-20 overflow-hidden'}>
                    <img className={'rounded-full'} src={img} alt=""/>
                </div>
                <div className={'text-slate-200 flex items-center'}>
                    <div className={'flex flex-col'}>
                        <div>
                            <span>{user?.name}&nbsp;</span>
                            <span>{user?.lastname}</span>
                        </div>
                        <div className={'flex'}>
                            {!isChanging ?
                                <div className={'hover:bg-slate-600 px-2 py-1'}
                                     onClick={e => statusHandler(e)}
                                >{user.status ? user.status : 'Set status'}</div>
                                :
                                <div>
                                    <input className={'bg-slate-700 px-2 rounded-md'}
                                           type="text" value={status}
                                           onKeyPress={e => keyPressHandle(e)}
                                           onChange={e => setStatus(e.target.value)}
                                    />
                                </div>
                            }
                        </div>
                        <div>
                            Online?
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex gap-4 text-slate-200 justify-between text-center'}>
                <div className={'bg-slate-700 w-full py-3 rounded-md'}>
                    Add friend
                </div>
                <div className={'bg-slate-700 w-full py-3 rounded-md'}
                onClick={startDialogue}
                >
                    Send msg
                </div>
            </div>
            <div className={'flex flex-col text-slate-400'}>
                <div>
                    День рождения: date.axisos
                </div>
                <div>
                    Посмотреть всю информацию
                </div>
            </div>
        </div>
    );
};

export default Profile;
