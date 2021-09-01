import {
    LOADING_STATES,

    ALL_CATEGORIES_GET_REQUEST,
    ALL_CATEGORIES_GET_SUCCESS,
    ALL_CATEGORIES_GET_FAILURE,
  } from '../constants';

const IState = {
    loading: {},
    allCategories: []
};

function budget(state = IState, action) {
    const newLoadingState = { ...state.loading };

    switch (action.type) {
        case ALL_CATEGORIES_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                },
            };
        case ALL_CATEGORIES_GET_SUCCESS:
            delete newLoadingState.BUDGET_GET_REQUEST;

            return {
                ...state,
                loadingState: newLoadingState,
                budget: action.req,
            };
        case ALL_CATEGORIES_GET_FAILURE:
            delete newLoadingState.BUDGET_GET_REQUEST;

            return {
                ...state,
                loadingState: newLoadingState,
                budget: {},
            };
        default:
            return state;
    }
};

export default budget;