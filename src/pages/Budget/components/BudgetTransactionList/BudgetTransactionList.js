import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';

import { List, ListItem } from './BudgetTransactionList.css';
import { formatCurrency, formDate } from '../../../../utils';

function BudgetTransactionList({ transactions, allCategories, selectedParentCategoryId, budgetedCategories }) {
    console.log(budgetedCategories)
    const filteredTransactionsBySelectedCategory = (() => {
        if (typeof selectedParentCategoryId === 'undefined') {
            return transactions;
        }
        
        if (selectedParentCategoryId === null) {
            return transactions.filter(transaction => {
                const hasBudgetCategory = budgetedCategories
                    .some((budgetCategory) => budgetCategory.categoryId === transaction.categoryId);

                return !hasBudgetCategory;
            })
        }

        return transactions
            .filter(transaction => {
                try {
                    const category = allCategories
                        .find(category => category.id === transaction.categoryId);
                    const parentCategoryName = category.parentCategory.name;

                    return parentCategoryName === selectedParentCategoryId;
                } catch (error) {
                    return false;
                }
            });
    })();

    const groupedTransactions = groupBy(
        filteredTransactionsBySelectedCategory,
        transaction => new Date(transaction.date).getUTCDate()
    );
    return (
        <List>
            {Object.entries(groupedTransactions).map(([key, transactions]) => (
                <li key={key}>
                    <ul>
                        {transactions.map(transaction => (
                            <ListItem key={transaction.id}>
                                <div>{transaction.description}</div>
                                <div>{formatCurrency(transaction.amount)}</div>
                                <div>{formDate(transaction.date)}</div>
                                <div>{(allCategories.find(category => category.id === transaction.categoryId) || { name: 'brak' }).name}</div>
                            </ListItem>
                        ))}
                    </ul>
                </li>
            ))}
        </List>
    )
}

export default connect(state => ({
    transactions: state.budget.budget.transactions,
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
    selectedParentCategoryId: state.budget.selectedParentCategoryId
}))(BudgetTransactionList);