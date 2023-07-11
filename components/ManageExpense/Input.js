import { View, Text, TextInput, StyleSheet } from "react-native"
import { GlobalStyle } from "../../constants/theme"

export default function Input ({label, invalid, style, textInputConfig}) {

  let inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  };

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  };

  return <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput {...textInputConfig} style={inputStyles}/>
  </View>
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyle.primaryColor100,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: GlobalStyle.primaryColor700,
    color: GlobalStyle.primaryColor100,
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  inputMultiline: {
    minHeight: 100,
    // if multiline
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyle.secondaryColor,
  },
  invalidInput: {
    backgroundColor: GlobalStyle.secondaryColor,
  }
})
