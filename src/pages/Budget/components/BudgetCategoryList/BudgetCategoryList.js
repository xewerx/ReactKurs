import React from 'react'
import { connect } from 'react-redux';
import { groupBy } from 'lodash';

import { ToggleableList } from '../../../../components';

function BudgetCategoryList({ budgetedCategories, allCategories }) {
    const budgetCategoriesByParent = groupBy(budgetedCategories, item => allCategories.find(category => category.id === item.categoryId).parentCategory.name );

    console.log(budgetedCategories);
    console.log(budgetCategoriesByParent);

    return (
        <div>
            <ToggleableList
                items={[]} />
        </div>
    )
}

export default connect(state => ({
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories
}))(BudgetCategoryList);