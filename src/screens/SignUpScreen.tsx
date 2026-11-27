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
import AuthTextInput from '../components/AuthTextInput';
import PrimaryButton from '../components/PrimaryButton';
import { AuthStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { SignUpErrors, validateSignUp } from '../utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const nextErrors = validateSignUp(name, email, password, confirmPassword);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      // Placeholder for Supabase auth:
      // await supabase.auth.signUp({
      //   email,
      //   password,
      //   options: { data: { full_name: name.trim() } },
      // })
      console.log('Sign-up submit ready for Supabase', {
        name: name.trim(),
        email: email.trim(),
      });
      Alert.alert('Ready for Supabase', 'Sign-up validation passed. Wire this to supabase.auth.signUp.');
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
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>
              Set up your profile so we can personalize your fitness journey.
            </Text>
          </View>

          <View style={styles.form}>
            <AuthTextInput
              label="Name"
              value={name}
              onChangeText={(value) => {
                setName(value);
                if (errors.name) {
                  setErrors((current) => ({ ...current, name: undefined }));
                }
              }}
              error={errors.name}
              autoCapitalize="words"
              autoComplete="name"
              placeholder="Your name"
              textContentType="name"
            />

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
              autoComplete="password-new"
              placeholder="At least 8 characters"
              textContentType="newPassword"
            />

            <AuthTextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={(value) => {
                setConfirmPassword(value);
                if (errors.confirmPassword) {
                  setErrors((current) => ({ ...current, confirmPassword: undefined }));
                }
              }}
              error={errors.confirmPassword}
              isPassword
              autoCapitalize="none"
              autoComplete="password-new"
              placeholder="Re-enter your password"
              textContentType="newPassword"
            />
          </View>

          <PrimaryButton
            label={submitting ? 'Creating account...' : 'Create Account'}
            onPress={handleSubmit}
            disabled={submitting}
            style={styles.submit}
          />

          <Pressable onPress={() => navigation.navigate('Login')} style={styles.switchRow}>
            <Text style={styles.switchText}>
              Already have an account? <Text style={styles.switchLink}>Log In</Text>
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
