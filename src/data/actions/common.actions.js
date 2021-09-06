import {
    ALL_CATEGORIES_GET,
} from '../constants';
import API from '../fetch';

export const fetchAllCategoriesAction = () => {
    const promise = API.common.fetchAllCategories();

    return { type: ALL_CATEGORIES_GET, promise };

}