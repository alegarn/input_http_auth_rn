import { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '../UI/IconButton';
import { GlobalStyle } from '../constants/theme';
import Button from '../UI/Button';

import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';

export default function ManageExpense({ route, navigation }) {

  const expensesContext = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });

  }, [navigation, isEditing]);


  const handleCancel = () => {
    navigation.goBack();
  }
  const confirmHandler = () => {
    if (isEditing) {
      expensesContext.updateExpense( editedExpenseId, { title: 'only test', amount: 9.99, date: new Date() });
      navigation.goBack();
    } else {
      expensesContext.addExpense({ title: 'test', amount: 10, date: new Date() });
    }
  }
  const handleDelete = () => {
    expensesContext.deleteExpense(editedExpenseId);
    navigation.goBack();
    // Dummy delete functionality
    console.log('Delete button clicked');
  };

  const handleEdit = () => {
    expensesContext.updateExpense(editedExpenseId);
    navigation.navigate("ManageExpense", { expenseId: editedExpenseId });
    // Dummy edit functionality
    console.log('Edit button clicked');
  };

  return (
    <View style={styles.container}>
      <Text>Your Screen ManageExpense</Text>
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={handleCancel} style={styles.button}>Cancel</Button>
        <Button onPress={confirmHandler} style={styles.button} >{isEditing ? 'Update' : 'Add'}</Button>
      </View>
      {isEditing && (
        <View style={styles.buttonDeleteContainer}>
          <IconButton icon="trash" title="Delete" onPress={handleDelete} color={"red"} size={28} />
          <IconButton icon="" title="Edit" onPress={handleEdit} color={"blue"} size={28}/>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    backgroundColor: GlobalStyle.primaryColor300,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttonDeleteContainer: {
    width: '100%',
    borderTopColor: GlobalStyle.primaryColor100,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  buttonEdit: {
    color: 'blue',
  }
});

