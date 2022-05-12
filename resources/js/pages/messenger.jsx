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
        // localStorage.setItem('Dialogue', JSON.stringify(e.currentTarget.dataset.peer));
    };

    useEffect(() => {
        axios.post('/dialogues')
            .then(r => {
                // console.log(r.data);
                setDialogues(r.data);
            })
            .catch(error => {
                if (error) {
                    localStorage.removeItem('isAuth');
                    dispatch({type: 'LOG_OUT', payload: false});
                    console.log(error);
                }
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

    return (
        <div className={'text-slate-200 px-4 mt-4'}>
            <div className={'flex gap-2'}>
                <div className={'flex flex-col w-1/3 bg-slate-700 rounded-md'}>
                    <div className={'flex'}>
                        <input className={'w-full rounded-md px-2 mb-2 h-fit py-1'}
                               type="text"
                               placeholder={'Поиск диалога'}/>
                    </div>
                    <div className={'flex flex-col'}>
                        {
                            (dialogues) ?
                                dialogues.map((dialogue) =>
                                    <div className="flex-1 p-2 hover:bg-slate-600"
                                         data-peer={dialogue.dialogue_acceptor_id}
                                         key={dialogue.id}
                                         onClick={e => selectDialogue(e)}
                                    >
                                        <div className="dialogue-image"
                                             style={{backgroundImage: 'url(' + dialogue.acceptor.photo + ')'}}>
                                        </div>
                                        <div className="dialogue-info">
                                            <div className="top-info flex justify-between">
                                                <div className="dialogue-name">
                                                    <span>{dialogue.acceptor.name} </span>
                                                    <span>{dialogue.acceptor.lastname}</span>
                                                </div>
                                                <div className="last-msg-time">
                                                    11:22 PM
                                                </div>
                                            </div>
                                            <div className="dialogue-msg-preview">
                                                You: gay
                                            </div>
                                        </div>
                                    </div>
                                )
                                : <span>Никаких диалогов нет</span>
                        }
                    </div>
                </div>
                <div className={'flex flex-grow flex-col bg-slate-700 rounded-md p-2'}>
                    <div className={'flex flex-1 flex-col'}>
                        {
                            (msgs.length > 0) ?
                                msgs.map((msg) =>
                                    <div className="msg-view" key={msg.id}>
                                        <div className="msg-avatar">
                                            <div className="msg-avatar__avatar"
                                                 style={{backgroundImage: 'url(' + msg.user.photo + ')'}}>

                                            </div>
                                        </div>
                                        <div className="msg-info">
                                            <div className="msg-info-top">
                                                <div className="msg-name">
                                                    <span>{msg.user.name}</span>
                                                </div>
                                                <div className="msg-time">
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
                    <div className={'flex items-end'}>
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
                        <div className="send-btn">
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messenger;
