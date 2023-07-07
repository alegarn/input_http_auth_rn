import { View, StyleSheet, FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';
export default function ExpensesList({ expenses }) {



  const renderItem = ({ item }) => (
    <ExpenseItem {...item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: '80%',
  },

});
