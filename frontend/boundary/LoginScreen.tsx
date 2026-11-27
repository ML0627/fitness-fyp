import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginController, LoginErrors } from '../control/LoginController';
import { AuthStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import AuthTextInput from './components/AuthTextInput';
import PrimaryButton from './components/PrimaryButton';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const loginController = new LoginController();

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    try {
      const result = loginController.login(email, password);
      if (!result.ok) {
        setErrors(result.errors);
        return;
      }

      setErrors({});
      Alert.alert(
        'Ready for Supabase',
        'Login validation passed. Wire this to supabase.auth.signInWithPassword.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable onPress={() => navigation.navigate('Welcome')} hitSlop={8}>
            <Text style={styles.back}>← Back</Text>
          </Pressable>

          <View style={styles.header}>
            <Text style={styles.title}>Log in</Text>
            <Text style={styles.subtitle}>Welcome back. Continue where you left off.</Text>
          </View>

          <View style={styles.form}>
            <AuthTextInput
              label="Email"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                if (errors.email) {
                  setErrors((current) => ({ ...current, email: undefined }));
                }
              }}
              error={errors.email}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              placeholder="you@email.com"
              textContentType="emailAddress"
            />

            <AuthTextInput
              label="Password"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                if (errors.password) {
                  setErrors((current) => ({ ...current, password: undefined }));
                }
              }}
              error={errors.password}
              isPassword
              autoCapitalize="none"
              autoComplete="password"
              placeholder="Enter your password"
              textContentType="password"
            />
          </View>

          <PrimaryButton
            label={submitting ? 'Logging in...' : 'Log In'}
            onPress={handleSubmit}
            disabled={submitting}
            style={styles.submit}
          />

          <Pressable onPress={() => navigation.navigate('SignUp')} style={styles.switchRow}>
            <Text style={styles.switchText}>
              New here? <Text style={styles.switchLink}>Create Account</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 20,
  },
  back: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  header: {
    gap: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
  },
  form: {
    gap: 16,
  },
  submit: {
    marginTop: 4,
  },
  switchRow: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  switchLink: {
    color: colors.primary,
    fontWeight: '700',
  },
});
