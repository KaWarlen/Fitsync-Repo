import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../shared/theme';

export const getStyles = (theme: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 200,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: theme.primary,
    marginTop: 0,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    marginTop: 8,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.text,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 'auto',
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    width: '100%',
    gap: 15,
    marginBottom: 'auto',
    paddingBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonSecondary: {
    backgroundColor: theme.card,
    borderWidth: 2,
    borderColor: theme.primary,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
  buttonTextSecondary: {
    color: theme.primary,
  },
});

export default getStyles;
