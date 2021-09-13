import {
    BUDGETED_CATEGORIES_GET,
    BUDGET_GET,
    SET_SELECTED_PARENT_CATEGORY_ID
} from '../constants';
import API from '../fetch';

export const fetchBudgetAction = (id) => {
    const promise = API.budget.fetchBudget(id);

    return { type: BUDGET_GET, promise };

}

export const fetchBudgetCategoriesAction = (id) => {
    const promise = API.budget.fetchBudgetCategories(id);

    return { type: BUDGETED_CATEGORIES_GET, promise };
}

export const selectParentCategory = (id) => {
    return {
        type: SET_SELECTED_PARENT_CATEGORY_ID,
        payload: id
    }
}