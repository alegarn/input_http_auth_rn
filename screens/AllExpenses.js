import { StyleSheet } from 'react-native';
import ExpensesOuput from '../components/ExpensesOuput';
import { GlobalStyle } from '../constants/theme';

export default function AllExpenses() {
  return (
    <ExpensesOuput expensesPeriod={' 7 days Expenses'} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

