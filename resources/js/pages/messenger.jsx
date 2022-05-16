import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import moment from "moment";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";

const Messenger = () => {
    const [msgs, setMsgs] = useState([]);
    const [message, setMessage] = useState('');
    const [dialogues, setDialogues] = useState('');
    const [activeDialogue, setActiveDialogue] = useState(0);
    const navState = useLocation();

    const dispatch = useDispatch();

    const msgBlock = useRef();

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message !== null) {
            await axios.post('/sendMessages', {message: message, acceptor_id: activeDialogue})
                .then(r => {
                    setMsgs([...msgs, r.data]);
                });
        }
        setMessage('');

    };
    const selectDialogue = (e) => {
        setActiveDialogue(e.currentTarget.dataset.peer);
        navState.state = e.currentTarget.dataset.peer;
        // localStorage.setItem('Dialogue', JSON.stringify(e.currentTarget.dataset.peer));
    };

    // useEffect(() => {
    //     setActiveDialogue(navState.state);
    // }, []);

    useEffect(() => {
        axios.post('/dialogues')
            .then(r => {
                // console.log(r.data);
                setDialogues(r.data);
            })
            .catch(error => {
                localStorage.removeItem('isAuth');
                dispatch({type: 'LOG_OUT', payload: false});
                console.log(error);
                if (error.status === 401) location.href = '/linkin';
            });
        // return () => {
        //     setDialogues('');
        // };
    }, []);


    useEffect(() => {
        axios.post('/messages', {acceptor_id: activeDialogue})
            .then(r => {
                // const mes = (r.data[0]);
                // mes.sort((perv, next) => perv.id - next.id);
                setMsgs(r.data);
            })
            .catch(error => {
                if (error) {
                    localStorage.clear();
                    dispatch({type: 'LOG_OUT', payload: false});
                }
            });
    }, [activeDialogue]);

    useEffect(() => {
        const tim = setInterval(() => {
            if (activeDialogue !== 0) {
                axios.post('/messages', {acceptor_id: activeDialogue})
                    .then(r => {
                        setMsgs(r.data);
                    });
            }
        }, 3000);

        return function clear() {
            clearInterval(tim);
        };
    }, [activeDialogue]);


    return (
        <div className={'text-slate-200 px-4 mt-4'}>
            <div className={'flex gap-2 relative'}>
                <div className={'flex flex-1 flex-col bg-slate-700 rounded-md whitespace-nowrap'}>
                    <div className={'flex'}>
                        <input className={'w-full rounded-md px-2 mb-2 h-fit py-1'}
                               type="text"
                               placeholder={'Поиск диалога'}/>
                    </div>
                    <div className={'flex flex-col'}>
                        {
                            (dialogues) ?
                                dialogues.map((dialogue) =>
                                    <div className={'flex flex-1 gap-4 p-2 hover:bg-slate-600'}
                                         data-peer={dialogue.dialogue_acceptor_id}
                                         key={dialogue.id}
                                         onClick={e => selectDialogue(e)}
                                    >
                                        <div className="dialogue-image h-10 w-10 rounded-full bg-center bg-contain"
                                             style={{backgroundImage: 'url(' + dialogue.acceptor.photo + ')'}}>
                                        </div>
                                        <div className="dialogue-info">
                                            <div className="top-info flex justify-between">
                                                <div className="dialogue-name">
                                                    <span>{dialogue.acceptor.name}&nbsp;{dialogue.acceptor.lastname} </span>
                                                </div>
                                                &nbsp;
                                                <div className="last-msg-time">
                                                    11:22 PM
                                                </div>
                                            </div>
                                            <div className="dialogue-msg-preview">

                                            </div>
                                        </div>
                                    </div>
                                )
                                : <span>Никаких диалогов нет</span>
                        }
                    </div>
                </div>
                <div className={'sm:flex flex-grow flex-col bg-slate-700 rounded-md p-2 h-screen sm:relative xs:absolute xs:w-full ' + (activeDialogue === 0 ? 'xs:hidden' : 'xs:flex')}>
                    <div className={'xs:flex sm:hidden justify-end border-b-2 border-black py-2'}>
                        <div className={'rounded-md py-1 px-2  border-2 border-slate-800'}
                        onClick={e => setActiveDialogue(0)}
                        >Закрыть</div>
                    </div>
                    <div className={'flex flex-1 flex-col gap-2 overflow-auto'}>
                        {(msgs.length > 0) ?
                            msgs.map((msg) =>
                                <div className="msg-view flex gap-4" key={msg.id}>
                                    <div className="msg-avatar">
                                        <div className="msg-avatar__avatar h-10 w-10 rounded-full bg-center bg-contain"
                                             style={{backgroundImage: 'url(' + msg.user.photo + ')'}}>
                                        </div>
                                    </div>
                                    <div className="msg-info">
                                        <div className="flex gap-2 items-baseline">
                                            <div className="font-bold">
                                                <span>{msg.user.name}</span>
                                            </div>
                                            <div className="font-thin text-sm text-slate-200">
                                                <span>{moment(msg.created_at).format("HH:mm")}</span>
                                            </div>
                                        </div>
                                        <div className="msg-message">
                                            <span>{msg.message_text}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                            : <span>Нет сообщений</span>
                        }
                    </div>
                    {activeDialogue ?
                        <div className={'flex items-end gap-2'}>
                            <div className={'w-full'}>
                                <input type="text"
                                       className={'w-full'}
                                       name={'message'}
                                       placeholder={'Write a message'}
                                       value={message}
                                       autoComplete={'disable'}
                                       onChange={event => setMessage(event.target.value)}
                                />
                            </div>
                            <div className="flex py-2 sm:text-sm px-3 border-2 border-slate-800 rounded-md">
                                <button onClick={sendMessage}>Отправить</button>
                            </div>
                        </div> : ''}
                </div>
            </div>
        </div>
    );
};

export default Messenger;
