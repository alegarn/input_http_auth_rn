import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyle } from '../constants/theme';

export default function ExpensesSummary({ expenses, periodName }) {

  const totalExpenses = expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <View style={styles.largeCardContainer}>
        <Text style={[styles.textBase, styles.largeCardPeriod]}>Last {periodName}</Text>
        <Text style={[styles.textBase,styles.largeCardAmount]}>${totalExpenses.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  largeCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    padding: 16,
    backgroundColor: GlobalStyle.primaryColor900, // Replace with your desired background color
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  textBase: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  largeCardPeriod: {
    color: GlobalStyle.primaryColor300,
  },
  largeCardAmount: {
    textAlign: 'right',
    color: GlobalStyle.primaryColor100,
  },
});
