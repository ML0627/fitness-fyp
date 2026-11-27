import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'solid' | 'outline';
  disabled?: boolean;
  style?: ViewStyle;
};

export default function PrimaryButton({
  label,
  onPress,
  variant = 'solid',
  disabled = false,
  style,
}: PrimaryButtonProps) {
  const isOutline = variant === 'outline';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isOutline ? styles.outline : styles.solid,
        pressed && !disabled && (isOutline ? styles.outlinePressed : styles.solidPressed),
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.label, isOutline ? styles.outlineLabel : styles.solidLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  solid: {
    backgroundColor: colors.primary,
  },
  solidPressed: {
    backgroundColor: colors.primaryPressed,
  },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  outlinePressed: {
    backgroundColor: colors.primarySoft,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  solidLabel: {
    color: '#FFFFFF',
  },
  outlineLabel: {
    color: colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
});
