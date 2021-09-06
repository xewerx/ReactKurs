import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import { fetchBudgetAction, fetchBudgetCategoriesAction } from '../../data/actions/budget.actions';
import { fetchAllCategoriesAction } from '../../data/actions/common.actions';
import { Grid } from './components/Budget.css';
import LoadingIndicator from '../../components/Loading';

function Budget({ budget, commonState, budgetState, fetchBudgetAction, fetchBudgetCategoriesAction, fetchAllCategoriesAction }) {

    useEffect(() => {
      fetchAllCategoriesAction();
      fetchBudgetAction(1);
      fetchBudgetCategoriesAction(1);
      }, [fetchAllCategoriesAction, fetchBudgetAction, fetchBudgetCategoriesAction]);

      const isLoaded = useMemo(() => (!!commonState && Object.keys(commonState).length === 0) && (!!budgetState && Object.keys(budgetState) === 0), [commonState, budgetState]);
      console.log(commonState)
    return (
        <Grid>
            <section>
              {isLoaded ? 'LISTA KATEGOTII' : (<LoadingIndicator></LoadingIndicator>) }
            </section>
            <section>
            {isLoaded ? 'LISTA BUDGETOW' : (<LoadingIndicator></LoadingIndicator>) }
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
