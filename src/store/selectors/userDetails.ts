import {userState} from "../atoms/user";
import {selector} from "recoil";

export const userDetailState = selector({
    key: 'userDetailState',
    get: ({get}) => {
        const state = get(userState);
        return [state.firstname, state.lastname, state.description]
    },
});