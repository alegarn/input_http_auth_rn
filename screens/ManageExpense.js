import { useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../UI/IconButton';
import { GlobalStyle } from '../constants/theme';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '../util/http';
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from '../UI/ErrorOverlay';

export default function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
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

  const confirmHandler = async (expenseData) => {
    if (isEditing) {

      setIsSubmitting(true);
      try {
        expensesContext.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
        navigation.goBack();
      } catch (error) {
        setError("Error updating expense");
      };
      setIsSubmitting(false);
    } else {

      setIsSubmitting(true);
      try {
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({...expenseData, id: id});
        navigation.goBack();
      } catch (error) {
        setError("Error saving expense");
      };
      setIsSubmitting(false);
    };
  };

  const handleDelete =  async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesContext.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Error deleting expense");
    };
    setIsSubmitting(false);
  };

  const handleEdit = () => {
    expensesContext.updateExpense(editedExpenseId);
    navigation.navigate("ManageExpense", { expenseId: editedExpenseId });
  };


  const errorHandler = () => {
    setError(null);
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

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

