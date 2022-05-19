import React from 'react';

const ErrorsOk = ({Value, OK, ERROR}) => {
    return (
        <>
            {OK ?
                <h3 className={'mt-2 text-lime-500 italic'}>Вы успешно обновили данные {Value}</h3> : ''}
            {ERROR ?
                <h3 className={'mt-2 text-rose-500 bold'}>Ошибка обновления данных {Value}</h3> : ''}
        </>
    );
};

export default ErrorsOk;
