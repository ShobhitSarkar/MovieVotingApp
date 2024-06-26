import {setEntries, next, vote} from './core';


/**
 * This generic function takes any kind of action and current state
 * It then invokes the core function that matches the action
 * If the reduver doesn't recognize the action, it returns current state
 * @param state
 * @param action
 * @returns {*}
 */
export default function reducer(state, action){
    switch(action.type){
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
           return next(state);
        case 'VOTE':
            return vote(state, action.entry)
    }

    return state;
}