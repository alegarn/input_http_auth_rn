import { ActivityIndicator, View, StyleSheet } from "react-native";
import { GlobalStyle } from "../constants/theme";

export default function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white"/>
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
  }
})
