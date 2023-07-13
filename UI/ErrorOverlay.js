import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { GlobalStyle } from "../constants/theme";
import Button from "./Button";

export default function ErrorOverlay({message}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.textStyle, styles.title]}>An error occurred!</Text>
      <Text style={[styles.textStyle, styles.message]}>{message}</Text>
      <Button onPress={onConfirm} style={styles.button}>Okay</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    backgroundColor: GlobalStyle.primaryColor300,
  },
  textStyle: {
    textAlign: "center",
    margin: 8,
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  message: {
    fontSize: 18,
  },
  button: {
    margin: 8,
  }
})
