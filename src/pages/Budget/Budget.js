import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import { fetchBudgetAction, fetchBudgetCategoriesAction } from '../../data/actions/budget.actions';
import { fetchAllCategoriesAction } from '../../data/actions/common.actions';
import { Grid } from './Budget.css';
import LoadingIndicator from '../../components/Loading';

function Budget({ budget, commonState, budgetState, fetchBudgetAction, fetchBudgetCategoriesAction, fetchAllCategoriesAction }) {

    useEffect(() => {
      fetchAllCategoriesAction();
      fetchBudgetAction(1);
      fetchBudgetCategoriesAction(1);
      }, [fetchAllCategoriesAction, fetchBudgetAction, fetchBudgetCategoriesAction]);

      const isLoaded = useMemo(() => (commonState && budgetState), [commonState, budgetState]);
      console.log(isLoaded, commonState, budgetState)
    return (
        <Grid>
            <section>
              {isLoaded ? (<LoadingIndicator></LoadingIndicator>) : "LISTA" }
            </section>
            <section>
            {isLoaded ? (<LoadingIndicator></LoadingIndicator>) : "LISTA2"}
            </section>
        </Grid>
    )
};

export default connect(state => {
    return {
      budget: state.budget.budget,
      commonState: state.common.loading,
      budgetState: state.budget.loading
    }
  }, {
    fetchBudgetAction,
    fetchBudgetCategoriesAction,
    fetchAllCategoriesAction
  })(Budget)
