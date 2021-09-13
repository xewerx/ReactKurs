import React from "react";
import { connect } from "react-redux";
import 'styled-components/macro';
import { groupBy } from "lodash";
import { useTranslation } from "react-i18next";

import { ToggleableList } from "../../../../components";
import ParentCategory from "./ParentCategory";
import CategoryItem from "./CategoryItem";

import { selectParentCategory } from '../../../../data/actions/budget.actions';

function BudgetCategoryList({ budgetedCategories, allCategories, budget, selectParentCategory }) {
  const { t } = useTranslation();

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
          onClick={() => {
            onClick(parentName);
            selectParentCategory(parentName);
          }}
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

  const amountTaken = budgetedCategories.reduce((acc, budgetedCategory) => {
    const categoryTransactions = budget.transactions.filter(
      (transaction) => transaction.categoryId === budgetedCategory.id
    );
    const categoryExpenses = categoryTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    return acc + Math.max(categoryExpenses, budgetedCategory.budget);
  }, 0);

  const notBudgetedTransaction = budget.transactions.filter((transaction) => {
    return !budgetedCategories.find(
      (budgetedCategory) => budgetedCategory.id === transaction.categoryId
    );
  });

  const notBudgetedExpenses = notBudgetedTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const availableForRestCategories =
    budget.totalAmount - amountTaken - notBudgetedExpenses;
  console.log(availableForRestCategories);
  return (
    <div>
      <div css={`
        border-bottom: 5px solid ${({ theme }) => theme.color.gray.light };
      `}
      >
        <ParentCategory name={budget.name} amount={restToSpent} />
      </div>

      <ToggleableList items={listItems} />

      <div css={`
        border-top: 5px solid ${({ theme }) => theme.color.gray.light };
      `}
      >
        <ParentCategory name={t("Other categories")} amount={availableForRestCategories} />
      </div>
    </div>
  );
}

export default connect((state) => ({
  budgetedCategories: state.budget.budgetedCategories,
  allCategories: state.common.allCategories,
  budget: state.budget.budget,
}), {
  selectParentCategory
})(BudgetCategoryList);
