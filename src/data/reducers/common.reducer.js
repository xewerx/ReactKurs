import {
    LOADING_STATES,

    ALL_CATEGORIES_GET_REQUEST,
    ALL_CATEGORIES_GET_SUCCESS,
    ALL_CATEGORIES_GET_FAILURE,
  } from '../constants';

const IState = {
    loading: null,
    allCategories: []
};

function budget(state = IState, action) {
    const newLoadingState = { ...state.loading };

    switch (action.type) {
        case ALL_CATEGORIES_GET_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: LOADING_STATES.LOADING,
                },
            };
        case ALL_CATEGORIES_GET_SUCCESS:
            delete newLoadingState.BUDGET_GET_REQUEST;

            return {
                ...state,
                loading: newLoadingState,
                budget: action.payload,
            };
        case ALL_CATEGORIES_GET_FAILURE:
            delete newLoadingState.BUDGET_GET_REQUEST;

            return {
                ...state,
                loading: newLoadingState,
                budget: {},
            };
        default:
            return state;
    }
};

export default budget;