import { StyleSheet } from 'react-native';

export default (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#64b5f6' : '#007AFF',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: isDarkMode ? '#1e1e1e' : '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyStateText: {
    fontSize: 18,
    color: isDarkMode ? '#aaa' : '#666',
    marginTop: 20,
    fontWeight: '600',
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: isDarkMode ? '#777' : '#999',
    marginTop: 5,
  },
  diaContainer: {
    marginBottom: 25,
  },
  diaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#1a365d' : '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  diaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? '#64b5f6' : '#007AFF',
    marginLeft: 10,
  },
  exercicioCard: {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: isDarkMode ? '#fff' : '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  exercicioCardConcluido: {
    borderColor: isDarkMode ? '#81c784' : '#00C853',
    backgroundColor: '#F1F8F4',
  },
  exercicioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  exercicioNomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  exercicioNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? '#e0e0e0' : '#333',
    flex: 1,
  },
  treinoBadge: {
    backgroundColor: isDarkMode ? '#64b5f6' : '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  treinoBadgeText: {
    color: isDarkMode ? '#1e1e1e' : '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  exercicioDetalhes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  detalheItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detalheText: {
    fontSize: 14,
    color: isDarkMode ? '#aaa' : '#666',
  },
});
