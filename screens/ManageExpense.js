import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../UI/IconButton';
import { GlobalStyle } from '../constants/theme';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

export default function ManageExpense({ route, navigation }) {

  const expensesContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesContext.expenses?.find((expense) => (expense.id === editedExpenseId));


  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });

  }, [navigation, isEditing]);


  const handleCancel = () => {
    navigation.goBack();
  }
  const confirmHandler = (expenseData) => {
    console.log('Confirm handler', expenseData);
    if (isEditing) {
      expensesContext.updateExpense(editedExpenseId, expenseData);
      navigation.goBack();
    } else {
      expensesContext.addExpense(expenseData);
    }
    navigation.goBack();
  }
  const handleDelete = () => {
    expensesContext.deleteExpense(editedExpenseId);
    navigation.goBack();

  };

  const handleEdit = () => {
    expensesContext.updateExpense(editedExpenseId);
    navigation.navigate("ManageExpense", { expenseId: editedExpenseId });
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        handleCancel={handleCancel}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}/>
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

