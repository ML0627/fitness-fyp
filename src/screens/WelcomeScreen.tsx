import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { AuthStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.hero}>
        <View style={styles.orbLarge} />
        <View style={styles.orbSmall} />
        <SafeAreaView style={styles.heroContent}>
          <Text style={styles.brand}>ClubFit</Text>
          <Text style={styles.tagline}>
            Train with purpose. Track every rep. Build lasting habits.
          </Text>
        </SafeAreaView>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <Text style={styles.sheetTitle}>Ready when you are</Text>
        <Text style={styles.sheetCopy}>
          Log in to continue your plan, or create an account to get started.
        </Text>

        <View style={styles.actions}>
          <PrimaryButton label="Log In" onPress={() => navigation.navigate('Login')} />
          <PrimaryButton
            label="Create Account"
            variant="outline"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    flex: 1.15,
    backgroundColor: '#123628',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  orbLarge: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(46, 168, 110, 0.28)',
    top: -60,
    right: -40,
  },
  orbSmall: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    bottom: 40,
    left: -30,
  },
  heroContent: {
    paddingHorizontal: 28,
    paddingBottom: 36,
    gap: 14,
  },
  brand: {
    fontSize: 44,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 17,
    lineHeight: 26,
    color: 'rgba(255,255,255,0.86)',
    maxWidth: 300,
  },
  sheet: {
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 16,
    gap: 10,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  sheetCopy: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    marginBottom: 12,
  },
  actions: {
    gap: 12,
  },
});
