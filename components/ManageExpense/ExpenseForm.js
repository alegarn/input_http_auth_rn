import { View, Text, StyleSheet } from "react-native"
import { useState } from "react"
import { Alert } from "react-native";
// import getFormattedDate from "../util/date";

import Input from "./Input"
import Button from "../../UI/Button";
export default function ExpenseForm ({handleCancel, onSubmit, submitButtonLabel, defaultValues}) {

  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid:  true
    },
    // date: defaultValues ? getFormattedDate(defaultValues.date) : '',
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
      isValid: true
    },
    title: {
      value: defaultValues ? defaultValues.title : '',
      isValid: true
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInput) =>{
      return {
        ...currentInput,
        [inputIdentifier]: {value: enteredValue, isValid: true}
      }
    });
  };

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      title: inputs.title.value,
    };

    const amountIsValid = !isNaN(+expenseData.amount) || +expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const titleIsValid = expenseData.title.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !titleIsValid) {
      // Alert.alert('Invalid input', 'Please check your form.');
      setInputs((currentInput) => {
        return {
          ...currentInput,
          amount: {value: currentInput.amount.value, isValid: amountIsValid},
          date: {value: currentInput.date.value, isValid: dateIsValid},
          title: {value: currentInput.title.value, isValid: titleIsValid},
        }
      })
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.title.isValid;

  return <>
    <View style={styles.formContainer}>
    <Text style={styles.title}>Expense Form</Text>
    <View style={styles.inputRows}>
      <Input
        label="Amount"
        style={styles.rowInput}
        invalid={!inputs.amount.isValid}
        textInputConfig={{
          keyboardType: 'decimal-pad',
          maxLength: 8,
          onChangeText: inputChangeHandler.bind(this, 'amount'),
          value: inputs.amount.value,
        }}/>
      <Input
        label="Date"
        style={styles.rowInput}
        invalid={!inputs.date.isValid}
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangeHandler.bind(this, 'date'),
          value: inputs.date.value,
        }}/>
    </View>
    <Input
      label="Title"
      invalid={!inputs.title.isValid}
      textInputConfig={{
        multiline: true,
        onChangeText: inputChangeHandler.bind(this, 'title'),
        value: inputs.title.value,
        // autoCorrect: false,
        // autoCapitalize: 'none',
      }}/>
    </View>
    {formIsInvalid && (
      <Text style={styles.errorText}>Invalid input</Text>
    )}
    <View style={styles.buttonContainer}>
      <Button mode="flat" onPress={handleCancel} style={styles.button}>Cancel</Button>
      <Button onPress={submitHandler} style={styles.button} >{submitButtonLabel}</Button>
    </View>
  </>

}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    marginTop: 24,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  inputRows: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 8,
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
})
