import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../shared/theme";

export const getStyles = (theme: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  skipButtonText: {
    color: theme.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 5,
  },
  stepIndicator: {
    fontSize: 14,
    color: theme.textTertiary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: theme.text,
    fontWeight: '600',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 12,
  },
  input: {
    backgroundColor: theme.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.inputBorder,
    color: theme.text,
  },
  sexButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  sexButton: {
    flex: 1,
    backgroundColor: theme.card,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.border,
  },
  sexButtonSelected: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  sexButtonText: {
    fontSize: 16,
    color: theme.text,
    fontWeight: '600',
  },
  sexButtonTextSelected: {
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    backgroundColor: theme.backgroundSecondary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  backButtonText: {
    color: theme.textSecondary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 1,
    backgroundColor: theme.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: theme.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default getStyles;
