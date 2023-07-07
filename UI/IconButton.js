import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ icon, color, onPress}) {
  return (
    <Pressable onPress={onPress} style={(pressed) => pressed ? styles.pressed : styles.button}>
      <Ionicons name={icon} size={24} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
  },
  pressed: {
    opacity: 0.75,
  },
})
