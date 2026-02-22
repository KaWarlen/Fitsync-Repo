import { StyleSheet } from "react-native";

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 0,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 0,
  },
  logoImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: isDarkMode ? '#64b5f6' : '#007AFF',
  },
  subtitle: {
    fontSize: 16,
    color: isDarkMode ? '#aaa' : '#666',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: isDarkMode ? '#e0e0e0' : '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: isDarkMode ? '#333' : '#e0e0e0',
  },
  inputIcon: {
    marginRight: 10,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: isDarkMode ? '#e0e0e0' : '#333',
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
  forgotPassword: {
    color: isDarkMode ? '#64b5f6' : '#007AFF',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: isDarkMode ? '#64b5f6' : '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: isDarkMode ? '#64b5f6' : '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  loginButtonText: {
    color: isDarkMode ? '#1e1e1e' : '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  trainerButton: {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderWidth: 2,
    borderColor: isDarkMode ? '#64b5f6' : '#007AFF',
  },
  trainerButtonText: {
    color: isDarkMode ? '#64b5f6' : '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 14,
    color: isDarkMode ? '#aaa' : '#666',
  },
  signUpText: {
    fontSize: 14,
    color: isDarkMode ? '#64b5f6' : '#007AFF',
    fontWeight: '600',
  },
});

export default getStyles;
