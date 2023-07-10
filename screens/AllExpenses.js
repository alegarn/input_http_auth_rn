import { StyleSheet } from 'react-native';
import ExpensesOuput from '../components/ExpensesOuput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';

export default function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);

  return (
    <ExpensesOuput expensesPeriod={' 7 days Expenses'} expenses={expensesContext.expenses} fallbackText={'No expenses found.'} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

