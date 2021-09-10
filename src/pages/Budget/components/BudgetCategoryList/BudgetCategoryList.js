import React from "react";
import { connect } from "react-redux";
import { groupBy } from "lodash";

import { ToggleableList } from "../../../../components";
import ParentCategory from "./ParentCategory";
import CategoryItem from "./CategoryItem";

function BudgetCategoryList({ budgetedCategories, allCategories, budget }) {
  console.log(budget)
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
  
  // const totalSpent = budget.transactions.reduce(
  //   (acc, transaction) => acc + transaction.amount,
  //   0
  // );
  // const restToSpent = budget.totalAmount - totalSpent;

  // const amountTaken = budgetedCategories.reduce((acc, budgetedCategory) => {
  //   const categoryTransactions = budget.transactions.filter(transaction => transaction.categoryId === budgetedCategory.id);
  //   const categoryExpenses = categoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  //   return acc + categoryExpenses;
  // });

  return (
    <div>
      <ParentCategory name={budget.name} amount={2} />
      <ToggleableList items={listItems} />
    </div>
  );
}

export default connect(store => ({
  allCategories: store.common.allCategories,
  budget: store.budget.budget,
  budgetedCategories: store.budget.budgetedCategories,
})
)(BudgetCategoryList);
