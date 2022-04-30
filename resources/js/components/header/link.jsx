import React from 'react';
import {NavLink} from "react-router-dom";

const Link = ({to, children}) => {
    return (
        <NavLink to={to} className={'transition duration-200 hover:text-white px-3 py-1.5 hover:bg-gray-800 rounded-md'}>{children}</NavLink>
    );
};

export default Link;
