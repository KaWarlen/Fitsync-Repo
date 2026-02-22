import { StyleSheet } from "react-native";

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
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
    color: isDarkMode ? '#64b5f6' : '#007AFF',
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
    color: isDarkMode ? '#64b5f6' : '#007AFF',
    marginBottom: 5,
  },
  stepIndicator: {
    fontSize: 14,
    color: isDarkMode ? '#777' : '#999',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: isDarkMode ? '#e0e0e0' : '#333',
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
    color: isDarkMode ? '#e0e0e0' : '#333',
    marginBottom: 12,
  },
  input: {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: isDarkMode ? '#333' : '#e0e0e0',
    color: isDarkMode ? '#e0e0e0' : '#333',
  },
  sexButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  sexButton: {
    flex: 1,
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: isDarkMode ? '#333' : '#e0e0e0',
  },
  sexButtonSelected: {
    backgroundColor: isDarkMode ? '#64b5f6' : '#007AFF',
    borderColor: isDarkMode ? '#64b5f6' : '#007AFF',
  },
  sexButtonText: {
    fontSize: 16,
    color: isDarkMode ? '#e0e0e0' : '#333',
    fontWeight: '600',
  },
  sexButtonTextSelected: {
    color: isDarkMode ? '#1e1e1e' : '#fff',
  },
  nextButton: {
    backgroundColor: isDarkMode ? '#64b5f6' : '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: isDarkMode ? '#64b5f6' : '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  nextButtonText: {
    color: isDarkMode ? '#1e1e1e' : '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default getStyles;
