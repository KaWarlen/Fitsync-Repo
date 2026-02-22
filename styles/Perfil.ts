import { StyleSheet } from "react-native";

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
  },
  header: {
    backgroundColor: isDarkMode ? '#64b5f6' : '#007AFF',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: isDarkMode ? '#1e1e1e' : '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: isDarkMode ? '#1e1e1e' : '#fff',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: isDarkMode ? '#fff' : '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? '#64b5f6' : '#007AFF',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#333' : '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: isDarkMode ? '#aaa' : '#666',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: isDarkMode ? '#e0e0e0' : '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  logoutButton: {
    backgroundColor: isDarkMode ? '#e57373' : '#FF3B30',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: isDarkMode ? '#e57373' : '#FF3B30',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButtonText: {
    color: isDarkMode ? '#1e1e1e' : '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default getStyles;
