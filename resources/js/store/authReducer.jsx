const defaultState = {
    authed: false
};

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {...state, authed: action.payload};
        case LOG_OUT:
            return {...state, authed: action.payload};
        default:
            return state;
    }
};

export const loginAction = (payload) => ({type: LOG_IN, payload});
export const logoutAction = (payload) => ({type: LOG_OUT, payload});
