import React, {useEffect, useState} from 'react';
import img from '../components/placeholder/profile.png';
import {useSelector} from "react-redux";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import moment from "moment";

const Profile = () => {
    const [postMessage, setPostMessage] = useState('');
    const [posts, setPosts] = useState([]);
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
            axios.get(`/id${userID.id}`)
                .then(r => {
                    setUser(r.data.user);
                    setPosts(r.data.posts.reverse());
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

    const createPost = (e) => {
        e.preventDefault();
        axios.post('action/createPost', {postMessage, userID: userID.id}).then(r => {
            setPosts([r.data, ...posts]);
            setPostMessage('');
        }).catch(err => {
            alert(err);
        });
    };
    const deletePost = (e, postId) => {
        e.preventDefault();
        axios.post('action/deletePost', {id: postId}).then(r => {
            const newPosts = posts.filter((post) => post.id !== postId);
            setPosts(newPosts);
        });
    };
    return (
        <div className={'px-4 py-2 mt-2 flex flex-col gap-4'}>
            <Helmet>
                <title>
                    {`Профиль пользователя ${user?.name} ${user?.lastname}`}
                </title>
            </Helmet>
            <div className={'flex gap-4'}>
                <div className={'lg:w-52 lg:h-auto lg:rounded-md ' +
                    'xs:rounded-full xs:w-20 xs:h-20 overflow-hidden'}
                >
                    <label>
                        <img src={user.photo ? user.photo : img} alt=""/>
                        {authUser.id == userID.id ?
                            <input type="file" className={'hidden'} onChange={updatePhoto}/> : ''}
                    </label>
                </div>
                <div className={'text-slate-200 flex lg:items-start xs:items-center'}>
                    <div className={'flex flex-col'}>
                        <div>
                            <span>{user.name}&nbsp;</span>
                            <span>{user.lastname}</span>
                        </div>
                        <div className={'flex'}>
                            {!isChanging ?
                                <div className={(authUser.id == userID.id ? 'hover:bg-slate-600 ' : '') + 'px-2 py-1 '}
                                     onClick={e => statusHandler(e)}
                                >{user.status ? user.status :
                                    <span className={'italic text-slate-400'}>Установить статус</span>}</div>
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
                    {user.birthday ? `День рождения: ` + user.birthday : ''}
                </div>
                <div>
                    {user.gender === 0 ? '' : (
                        "Пол: " + (user.gender === 1 ? 'мужской' : 'женский')
                    )}
                </div>
                <div>
                    Посмотреть всю информацию
                </div>
            </div>
            <div className={'text-slate-300 flex flex-col gap-4'}>
                <h2 className={'text-2xl mb-2'}>Посты пользователя</h2>
                    <div className={'flex gap-4'}>
                        <input onChange={e => setPostMessage(e.target.value)}
                               value={postMessage}
                               className={'w-5/6'}
                               type="text"
                               placeholder={'О чем хочешь рассказать?'}/>
                        <button className={'hover:bg-slate-600 flex-grow w-auto font-bold'}
                                onClick={e => createPost(e)}>Рассказать
                        </button>
                    </div>
                {posts.map(post =>
                    <div key={post.id} className={'relative flex flex-col gap-2 bg-slate-700 px-4 py-2 rounded-md'}>
                        {authUser.id === user.id ? <div className={'right-0 mr-4 absolute flex justify-end'}>
                            <button className={'w-auto bg-red-900 hover:bg-red-800 border-red-800'}
                                    onClick={e => deletePost(e, post.id)}>Удалить
                            </button>
                        </div> : ''}
                        <div className={'flex gap-4 items-center'}>
                            <div className={'h-16 w-16 overflow-hidden rounded-full'}>
                                <img src={post.user.photo} alt=""/>
                            </div>
                            <div className={'flex flex-col '}>
                                <div>
                                    {post.user.name} {post.user.lastname}
                                </div>
                                <div className={'text-sm text-slate-400'}>
                                    {moment(post.created_at).format('DD MMM YYYY HH:mm')}
                                </div>
                            </div>
                        </div>
                        <div>
                            {post.post_message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
