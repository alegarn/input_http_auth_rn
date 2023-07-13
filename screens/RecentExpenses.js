import { StyleSheet } from 'react-native';
import { useContext, useState, useEffect } from 'react';

import ExpensesOuput from '../components/ExpensesOuput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';


import { getExpenses } from '../util/http';
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from '../UI/ErrorOverlay';

export default function RecentExpenses() {

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const expensesContext = useContext(ExpensesContext);


  const recentExpenses = expensesContext.expenses?.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return (expense.date >= date7DaysAgo) && (expense.date <= today);
  });

  useEffect (() => {
    async function fetchExpenses() {
      setIsFetching(true);
      try {
        const expenses = await getExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Error fetching expenses");
      }
      setIsFetching(false);
    };

    fetchExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  };

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }


  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );

  }

  return (
    <ExpensesOuput
      expenses={recentExpenses}
      expensesPeriod={'7 days'}
      fallbackText={'No expenses found for the last 7 days.'}/>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

