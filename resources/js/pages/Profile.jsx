import React, {useEffect, useState} from 'react';
import img from '../components/placeholder/profile.png';
import {useSelector} from "react-redux";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet";

const Profile = () => {
    const [user, setUser] = useState({});
    const authUser = useSelector(state => state.auth.user);
    const [isChanging, setChange] = useState(false);
    const [status, setStatus] = useState(user.status);
    const navigate = useNavigate();


    let userID = useParams();
    useEffect(() => {
        if (authUser.id == userID.id) {
            setUser(authUser);
        } else {
            axios.post(`/id${userID.id}`)
                .then(r => {
                    setUser(r.data.user);
                    if (!r.data.user) {
                        navigate('/id' + authUser?.id);
                        // location.pathname = '/id' + authUser?.id
                    }
                }).catch(err => {

            });
        }
    }, [userID]);

    const addFriend = async () => {
        await axios.post('/action/addToFriends', {friend_id: user.id});
    };

    const statusHandler = (e) => {
        if (authUser.id === user.id) {
            setChange(true);
            setStatus(user.status);
        }

    };
    const updatePhoto = (e) => {
        // setPhoto(e.target.files[0])
        const data = new FormData();
        data.append('photo', e.target.files[0]);
        axios.post('/profile/update/photo', data)
            .then(r => {
                setUser({...user, photo: r.data.photo});
            });
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
            <Helmet>
                <title>
                    {`Профиль пользователя ${user?.name} ${user?.lastname}`}
                </title>
            </Helmet>
            <div className={'flex gap-4 '}>
                <div className={'rounded-full w-20 h-20 overflow-hidden'}
                >
                    <label>
                    <img className={'rounded-full'} src={user.photo ? user.photo : img} alt=""/>
                        <input type="file" hidden onChange={updatePhoto}/>
                    </label>
                </div>
                <div className={'text-slate-200 flex items-center'}>
                    <div className={'flex flex-col'}>
                        <div>
                            <span>{user?.name}&nbsp;</span>
                            <span>{user?.lastname}</span>
                        </div>
                        <div className={'flex'}>
                            {!isChanging ?
                                <div className={'hover:bg-slate-600 px-2 py-1 '}
                                     onClick={e => statusHandler(e)}
                                >{user.status ? user.status : ' '}</div>
                                :
                                <div>
                                    <input className={'bg-slate-700 px-2 py-1 rounded-md'}
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
            <div className={'flex gap-4 text-slate-200 justify-between text-center cursor-pointer'}>
                {authUser.id === user.id ? '' :
                    <div className={'bg-slate-700 w-full py-3 rounded-md'}
                         onClick={addFriend}
                    >
                        Add friend
                    </div>}
                <div className={'bg-slate-700 w-full py-3 rounded-md cursor-pointer'}
                     onClick={startDialogue}
                >
                    Send msg
                </div>
            </div>
            <div className={'flex flex-col text-slate-400'}>
                <div>
                    {user?.birthday ? `День рождения: ` + user?.birthday : ''}
                </div>
                <div>
                    Посмотреть всю информацию
                </div>
            </div>
        </div>
    );
};

export default Profile;
