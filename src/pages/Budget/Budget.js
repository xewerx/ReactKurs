import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import { fetchBudgetAction, fetchBudgetCategoriesAction } from '../../data/actions/budget.actions';
import { fetchAllCategoriesAction } from '../../data/actions/common.actions';
import { Grid } from './Budget.css';
import LoadingIndicator from '../../components/Loading';
import BudgetCategoryList from './components/BudgetCategoryList';
import BudgetTransactionList from './components/BudgetTransactionList';

function Budget({ budget, commonState, budgetState, loadingCategoriesState, fetchBudgetAction, fetchBudgetCategoriesAction, fetchAllCategoriesAction }) {

    useEffect(() => {
      fetchAllCategoriesAction();
      fetchBudgetAction(1);
      fetchBudgetCategoriesAction(1);
      }, [fetchAllCategoriesAction, fetchBudgetAction, fetchBudgetCategoriesAction]);
      console.log(commonState, budgetState, loadingCategoriesState)
      const isLoaded = useMemo(() => (!commonState && !budgetState && !loadingCategoriesState), [commonState, budgetState, loadingCategoriesState]);
      
    return (
        <Grid>
            <section>
              {isLoaded ? (<BudgetCategoryList />) : (<LoadingIndicator></LoadingIndicator>) }
            </section>
            <section>
            {isLoaded ? (<BudgetTransactionList />) : (<LoadingIndicator></LoadingIndicator>)}
            </section>
        </Grid>
    )
};

export default connect(state => {
    return {
      budget: state.budget.budget,
      commonState: state.common.loading,
      budgetState: state.budget.loading,
      loadingCategoriesState: state.budget.loadingCategories
    }
  }, {
    fetchBudgetAction,
    fetchBudgetCategoriesAction,
    fetchAllCategoriesAction
  })(Budget)
