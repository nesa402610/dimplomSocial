import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Link from "./header/link";

const Header = () => {
    const [isDropDown, setDropDown] = useState(false);
    const dropDown = () => {
        setDropDown(!isDropDown);
    };
    return (
        <header className={''}>
            <nav className={'bg-gray-700'}>
                <div className={'xs:px-4 md:px-6 lg:px-8 flex flex-1 items-center justify-between h-12'}>
                    <div className={'flex text-gray-200'}>
                        <div className={'hidden sm:flex'}>
                            <Link to={'/'}>Главная</Link>
                            <Link to={'friends'}>Друзья</Link>
                            <Link to={'messages'}>Сообщения</Link>
                            <Link to={'search'}>Поиск</Link>
                        </div>
                    </div>
                    <div>
                        <div onClick={dropDown}
                             className={'relative text-white'}
                        >
                            Profile
                        </div>
                    </div>
                </div>
                {isDropDown ?
                    (<div className={'sm:hidden flex flex-col bg-gray-700 border-t-black border-t-2'}>
                        <Link to={'/'}>Главная</Link>
                        <Link to={'friends'}>Друзья</Link>
                        <Link to={'messages'}>Сообщения</Link>
                        <Link to={'search'}>Поиск</Link>
                    </div>)
                    : ''
                }
            </nav>
        </header>
    );
};

export default Header;
