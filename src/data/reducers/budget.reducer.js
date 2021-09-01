
import {
    LOADING_STATES,

    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,
} from '../constants';

const IState = {
    loading: {},
    budget: {},
    budgetCategories: []
}

function budget(state = IState, action) {
    const newLoadingState = { ...state.loading };

    switch (action.type) {
        case BUDGET_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                },
            };
        case BUDGET_GET_SUCCESS:
            delete newLoadingState.BUDGET_GET_REQUEST;

            return {
                ...state,
                loadingState: newLoadingState,
                budget: action.req,
            };
        case BUDGET_GET_FAILURE:
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