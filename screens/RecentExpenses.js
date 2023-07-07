import { StyleSheet } from 'react-native';
import ExpensesOuput from '../components/ExpensesOuput';

export default function RecentExpenses() {
  return (
    <ExpensesOuput expensesPeriod={'7 days'} />
  );
};

const styles = StyleSheet.create({
  container: {
/*     flex: 1,
 */    justifyContent: 'center',
    alignItems: 'center',
  },
});

