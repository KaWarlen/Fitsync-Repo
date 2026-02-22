import { StyleSheet } from "react-native";

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
  },
  header: {
    backgroundColor: isDarkMode ? '#64b5f6' : '#007AFF',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: isDarkMode ? '#1e1e1e' : '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: isDarkMode ? '#1e1e1e' : '#fff',
    opacity: 0.9,
  },
  listContent: {
    padding: 20,
  },
  emptyList: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  treinoCard: {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: isDarkMode ? '#fff' : '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  treinoHeader: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#333' : '#f0f0f0',
    paddingBottom: 10,
  },
  treinoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  treinoNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? '#e0e0e0' : '#333',
    flex: 1,
  },
  treinoDia: {
    fontSize: 14,
    color: isDarkMode ? '#aaa' : '#666',
  },
  treinoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  treinoInfo: {
    fontSize: 14,
    color: isDarkMode ? '#64b5f6' : '#007AFF',
    fontWeight: '600',
  },
});

export default getStyles;
