import React, {useState} from 'react';
import Link from "./header/link";
import {useSelector} from "react-redux";

const Header = () => {
    const [isDropDown, setDropDown] = useState(false);
    const user = useSelector(state => state.auth.user);
    const isAuth = useSelector(state => state.auth.authed);
    const dropDown = () => {
        setDropDown(!isDropDown);
    };
    return (
        <header className={''}>
            <nav className={'bg-gray-700'}>
                <div className={'xs:px-4 md:px-6 lg:px-8 flex flex-1 items-center justify-between h-12'}>
                    {isAuth ? (<div className={'flex text-slate-200'}>
                        <div className={'hidden sm:flex'}>
                            <Link to={'/id' + user.id}>Главная</Link>
                            <Link to={'/friends'}>Друзья</Link>
                            <Link to={'/messenger'}>Сообщения</Link>
                            <Link to={'/search'}>Поиск</Link>
                        </div>
                    </div>) : ''}
                    {isAuth ?
                        (<div>
                            <div onClick={dropDown}
                                 className={'relative text-slate-200'}>
                                Profile
                            </div>
                        </div>)
                        :
                        (<div className={'text-slate-200'}>
                            <Link to={'/linkin'} className={'text-slate-200'}>Войти</Link>
                        </div>)
                    }
                </div>
                {isDropDown ?
                    (<div className={'sm:hidden text-slate-200 flex flex-col bg-gray-700 border-t-black border-t-2'}>
                        <Link to={'/id' + user.id}>Главная</Link>
                        <Link to={'/friends'}>Друзья</Link>
                        <Link to={'/messenger'}>Сообщения</Link>
                        <Link to={'/search'}>Поиск</Link>
                        <Link to={'/logout'}>Выйти</Link>
                    </div>)
                    : ''
                }
            </nav>
        </header>
    );
};

export default Header;
