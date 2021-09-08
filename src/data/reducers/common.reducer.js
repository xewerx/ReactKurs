import {
    ALL_CATEGORIES_GET_REQUEST,
    ALL_CATEGORIES_GET_SUCCESS,
    ALL_CATEGORIES_GET_FAILURE,
  } from '../constants';

const IState = {
    loading: true,
    allCategories: []
};

function budget(state = IState, action) {

    switch (action.type) {
        case ALL_CATEGORIES_GET_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_CATEGORIES_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                budget: action.payload,
            };
        case ALL_CATEGORIES_GET_FAILURE:
            return {
                ...state,
                loading: false,
                budget: {},
            };
        default:
            return state;
    }
};

export default budget;