import {
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,

    BUDGETED_CATEGORIES_GET_REQUEST,
    BUDGETED_CATEGORIES_GET_SUCCESS,
    BUDGETED_CATEGORIES_GET_FAILURE,
    SET_SELECTED_PARENT_CATEGORY_ID
} from '../constants';

const IState = {
    loading: true,
    loadingCategories: true,
    budget: {},
    budgetedCategories: [],
    selectedParentCategoryId: undefined
}

function budget(state = IState, action) {
    switch (action.type) {
        case BUDGET_GET_REQUEST:
            return {
                ...state,
                loading: true
            };
        case BUDGET_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                budget: action.payload,
            };
        case BUDGET_GET_FAILURE:

            return {
                ...state,
                loading: false,
                budget: {},
            };
        case BUDGETED_CATEGORIES_GET_REQUEST:
            return {
                ...state,
                loadingCategories: true
            };
        case BUDGETED_CATEGORIES_GET_SUCCESS:

            return {
                ...state,
                loadingCategories: false,
                budgetedCategories: action.payload,
            };
        case BUDGETED_CATEGORIES_GET_FAILURE:
            console.log(action.error)
            return {
                ...state,
                loadingCategories: false,
                budgetedCategories: [],
            };
        case SET_SELECTED_PARENT_CATEGORY_ID:
            return {
                ...state,
                selectedParentCategoryId: action.payload
            }     
        
        default:
            return state;
    }
};

export default budget;