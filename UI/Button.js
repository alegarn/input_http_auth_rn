import { Pressable, Text, StyleSheet, View } from 'react-native';
import { GlobalStyle } from '../constants/theme';

export default function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed} >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>

  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center",
  },
  flat: {
    backgroundColor: "transparent",
  },
  flatText: {
    color: GlobalStyle.primaryColor900,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyle.primaryColor100,
    borderRadius: 4,
  }
});
