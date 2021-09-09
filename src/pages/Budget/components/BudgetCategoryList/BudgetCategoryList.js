import React from 'react'
import { connect } from 'react-redux';
import { groupBy } from 'lodash';

import { ToggleableList } from '../../../../components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';

function BudgetCategoryList({ budgetedCategories, allCategories }) {
    const budgetCategoriesByParent = groupBy(budgetedCategories, item => allCategories.find(category => category.id === item.categoryId).parentCategory.name );

    const listItems = Object.entries(budgetCategoriesByParent).map( ( [ parentName, categories ] ) => ({
        id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory 
                name={parentName}
                onClick={() => onClick(parentName)}            
            />
        ),
        children: categories.map(budgetedCategory => {
            const { name } = allCategories.find(category => category.id === budgetedCategory.categoryId)
            return <CategoryItem key={name} name={name} />
        })
    }));

    return (
        <div>
            <ToggleableList items={listItems} />
        </div>
    )
}

export default connect(state => ({
    budgetedCategories: state.budget.budgetCategories,
    allCategories: state.common.allCategories
}))(BudgetCategoryList);