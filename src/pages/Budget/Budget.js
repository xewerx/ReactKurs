import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import { fetchBudgetAction, fetchBudgetCategoriesAction } from '../../data/actions/budget.actions';
import { fetchAllCategoriesAction } from '../../data/actions/common.actions';
import { Grid } from './Budget.css';
import LoadingIndicator from '../../components/Loading';
import BudgetCategoryList from './components/BudgetCategoryList';
import BudgetTransactionList from './components/BudgetTransactionList';
import AddTransactionForm from './components/AddTransactionForm';
import { Button, Modal } from '../../components';
import { Fragment } from 'react';
import { Route, Switch } from 'react-router';

function Budget({ budget, commonState, budgetState, loadingCategoriesState, fetchBudgetAction, fetchBudgetCategoriesAction, fetchAllCategoriesAction, allCategories }) {

  useEffect(() => {
    fetchAllCategoriesAction();
    fetchBudgetAction(1);
    fetchBudgetCategoriesAction(1);
  }, [fetchAllCategoriesAction, fetchBudgetAction, fetchBudgetCategoriesAction]);
  console.log(commonState, budgetState, loadingCategoriesState)
  const isLoaded = useMemo(() => (!commonState && !budgetState && !loadingCategoriesState), [commonState, budgetState, loadingCategoriesState]);

  return (
    <Fragment>
      <Grid>
        <section>
          {isLoaded ? (<BudgetCategoryList />) : (<LoadingIndicator></LoadingIndicator>)}
        </section>
        <section>
          {isLoaded ? (
            <Fragment>
              <BudgetTransactionList />
              <Button variant="regular" to="/budget/transactions/new">Add new transaction</Button>
            </Fragment>
          ) : (
            <LoadingIndicator></LoadingIndicator>
          )
          }
        </section>
      </Grid>

      <Switch>
        <Route path="/budget/transactions/new">
          <Modal>
            <AddTransactionForm categories={allCategories} groupByCategoriesBy='categoryParent.name'/>
          </Modal>
        </Route>
      </Switch>
    </Fragment>
  )
};

export default connect(state => {
  return {
    budget: state.budget.budget,
    commonState: state.common.loading,
    budgetState: state.budget.loading,
    loadingCategoriesState: state.budget.loadingCategories,
    allCategories: state.common.allCategories
  }
}, {
  fetchBudgetAction,
  fetchBudgetCategoriesAction,
  fetchAllCategoriesAction
})(Budget)
