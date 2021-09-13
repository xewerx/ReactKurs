import React from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';

import { List, ListItem } from './BudgetTransactionList.css';
import { formatCurrency, formDate } from '../../../../utils';

function BudgetTransactionList({ transactions, allCategories }) {
    const groupedTransactions = groupBy(
        transactions,
        transaction => new Date(transaction.date).getUTCDate()
    )
    return (
        <List>
            {Object.entries(groupedTransactions).map(([key, transactions]) => (
                <li>
                    <ul>
                        {transactions.map(transaction => (
                            <ListItem>
                                <div>{transaction.description}</div>
                                <div>{formatCurrency(transaction.amount)}</div>
                                <div>{formDate(transaction.date)}</div>
                                <div>{(allCategories.find(category => category.id === transaction.categoryId) || {name: 'brak'}).name}</div>
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
    allCategories: state.common.allCategories
}))(BudgetTransactionList);