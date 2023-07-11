import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyle } from '../constants/theme';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';




export default function ExpensesOuput({ expenses, expensesPeriod, fallbackText }) {
  let content = <Text style={styles.infoTextStyle}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} periodName={expensesPeriod} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyle.primaryColor,
  },
  infoTextStyle: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 36,
  }
});
