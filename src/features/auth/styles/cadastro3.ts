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
  labelSubtext: {
    fontSize: 13,
    color: theme.textSecondary,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: theme.card,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: theme.border,
  },
  optionButtonSelected: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  optionButtonText: {
    fontSize: 16,
    color: theme.text,
    fontWeight: '500',
    textAlign: 'center',
  },
  optionButtonTextSelected: {
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
  finishButton: {
    flex: 1,
    backgroundColor: theme.success,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: theme.success,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default getStyles;
