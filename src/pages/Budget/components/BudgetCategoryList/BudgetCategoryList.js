import React from "react";
import { connect } from "react-redux";
import { groupBy, rest } from "lodash";

import { ToggleableList } from "../../../../components";
import ParentCategory from "./ParentCategory";
import CategoryItem from "./CategoryItem";

function BudgetCategoryList({ budgetedCategories, allCategories, budget }) {
  const budgetCategoriesByParent = groupBy(
    budgetedCategories,
    (item) =>
      allCategories.find((category) => category.id === item.categoryId)
        .parentCategory.name
  );

  const listItems = Object.entries(budgetCategoriesByParent).map(
    ([parentName, categories]) => ({
      id: parentName,
      Trigger: ({ onClick }) => (
        <ParentCategory
          name={parentName}
          onClick={() => onClick(parentName)}
          categories={categories}
          transactions={budget.transactions}
        />
      ),
      children: categories.map((budgetedCategory) => {
        const { name } = allCategories.find(
          (category) => category.id === budgetedCategory.categoryId
        );
        return (
          <CategoryItem
            key={name}
            name={name}
            item={budgetedCategory}
            transactions={budget.transactions}
          />
        );
      }),
    })
  );

  const totalSpent = budget.transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const restToSpent = budget.totalAmount - totalSpent;

  return (
    <div>
      <ParentCategory
        name={budget.name}
        amount={restToSpent}
      />
      <ToggleableList items={listItems} />
    </div>
  );
}

export default connect((state) => ({
  budgetedCategories: state.budget.budgetCategories,
  allCategories: state.common.allCategories,
  budget: state.budget.budget,
}))(BudgetCategoryList);
