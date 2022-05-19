import React, {useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import NameUpdate from "../components/profileEdit/nameUpdate";
import Errors_OK from "../components/profileEdit/Errors_OK";
import EmailUpdate from "../components/profileEdit/emailUpdate";
import GenderUpdate from "../components/profileEdit/genderUpdate";
import PhoneUpdate from "../components/profileEdit/phoneUpdate";
import BirthdayUpdate from "../components/profileEdit/birthdayUpdate";
import PasswordUpdate from "../components/profileEdit/passwordUpdate";
import {Helmet} from "react-helmet";

const ProfileEdit = () => {
    const user = useSelector(state => state.auth.user);
    const [updateResult, setUpdateResult] = useState({});
    const [errors, setErrors] = useState({});

    const updateHandler = (data) => {
        axios.post('profile/update/basicInfo', data).then(() => {
            setUpdateResult(data);
            setTimeout(() => setUpdateResult(0), 4000);
        }).catch(err => {
            setErrors(data);
            setTimeout(() => setErrors(0), 4000);
        });
    };

    return (
        <div className={'p-4'}>
            <Helmet>
                <title>Редактирование профиля</title>
            </Helmet>
            <div className={'flex flex-col gap-4 bg-slate-600 text-slate-300 p-4 rounded-md'}>
                <div>
                    <NameUpdate user={user} handler={updateHandler}/>
                    <Errors_OK Value={"о своем имени"} OK={updateResult.name} ERROR={errors.name}/>
                </div>
                <div>
                    <BirthdayUpdate user={user} handler={updateHandler}/>
                    <Errors_OK Value={"о дне рождении"} OK={updateResult.birthday} ERROR={errors.birthday}/>
                </div>
                <div>
                    <PhoneUpdate user={user} handler={updateHandler}/>
                    <Errors_OK Value={"о номере телефона"} OK={updateResult.phone} ERROR={errors.phone}/>
                </div>
                <div>
                    <GenderUpdate user={user} handler={updateHandler}/>
                    <Errors_OK Value={"о поле"} OK={updateResult.gender} ERROR={errors.gender}/>
                </div>
                <div>
                    <EmailUpdate user={user} handler={updateHandler}/>
                    <Errors_OK Value={"своей почты"} OK={updateResult.email} ERROR={errors.email}/>
                </div>
                <form>
                    <PasswordUpdate handler={updateHandler}/>
                    <Errors_OK Value={"пароля"} OK={updateResult.password} ERROR={errors.password}/>
                </form>
            </div>
        </div>
    );
};

export default ProfileEdit;
