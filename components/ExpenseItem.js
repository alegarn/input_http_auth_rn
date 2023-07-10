import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GlobalStyle } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

export default function ExpenseItem({ id, title, amount, date }) {
  const navigation = useNavigation();

  function itemPressed() {
    navigation.navigate('ManageExpense', { expenseId: id });
  };

  return (
    <Pressable onPress={itemPressed} style={({pressed}) => (pressed && styles.onPress)}>
      <View style={styles.largeCardContainer}>
        <View style={styles.cardInfos}>
          <Text style={[styles.cardBase, styles.largeCardTitle]}>{title}</Text>
          <Text style={[styles.cardBase, styles.largeCardDate]}>{date.toDateString()}</Text>
        </View>
        <Text style={[styles.cardBase, styles.largeCardAmount]}>${amount.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onPress: {
    opacity: 0.75,
  },
  largeCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: GlobalStyle.primaryColor300,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: GlobalStyle.primaryColor200,
    elevation: 3,
    shadowColor: GlobalStyle.primaryColor200,
    shadowOffset: { width: 0, height: 2,},
    shadowOpacity: 0.25,
  },
  cardInfos: {
    flexDirection: "column"
  },
  cardBase: {
    color: 'white',
    flex: 1,
  },
  largeCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  largeCardAmount: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: "white",
    fontWeight: 'bold',
    textAlign: "right"

  },
  largeCardDate: {
    fontSize: 14,
  },
});
