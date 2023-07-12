import { StyleSheet } from 'react-native';
import { useContext } from 'react';

import ExpensesOuput from '../components/ExpensesOuput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

export default function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);
  console.log('recentExpenses', expensesContext);
  const recentExpenses = expensesContext.expenses?.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return (expense.date >= date7DaysAgo) && (expense.date <= today);
  });

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

