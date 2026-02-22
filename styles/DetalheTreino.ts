import { StyleSheet } from "react-native";

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
  },
  header: {
    backgroundColor: isDarkMode ? '#64b5f6' : '#007AFF',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: isDarkMode ? '#1e1e1e' : '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: isDarkMode ? '#1e1e1e' : '#fff',
    opacity: 0.9,
  },
  progressContainer: {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#333' : '#f0f0f0',
  },
  progressInfo: {
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: isDarkMode ? '#e0e0e0' : '#333',
    fontWeight: '600',
    marginBottom: 8,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#1b5e20' : '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  completedText: {
    fontSize: 14,
    color: isDarkMode ? '#81c784' : '#00C853',
    fontWeight: '600',
    marginLeft: 6,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: isDarkMode ? '#333' : '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: isDarkMode ? '#81c784' : '#00C853',
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  exercicioCard: {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: isDarkMode ? '#333' : '#e0e0e0',
    shadowColor: isDarkMode ? '#fff' : '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  exercicioCardConcluido: {
    borderColor: isDarkMode ? '#81c784' : '#00C853',
    backgroundColor: '#F1F8F4',
  },
  exercicioHeader: {
    marginBottom: 12,
  },
  exercicioTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exercicioNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? '#e0e0e0' : '#333',
    flex: 1,
  },
  exercicioNomeConcluido: {
    color: isDarkMode ? '#81c784' : '#00C853',
    textDecorationLine: 'line-through',
  },
  exercicioDetalhes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: isDarkMode ? '#333' : '#f0f0f0',
  },
  detalheItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detalheText: {
    fontSize: 14,
    color: isDarkMode ? '#aaa' : '#666',
    fontWeight: '500',
  },
  footer: {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: isDarkMode ? '#333' : '#f0f0f0',
  },
  finalizarButton: {
    backgroundColor: isDarkMode ? '#81c784' : '#00C853',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: isDarkMode ? '#81c784' : '#00C853',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  finalizarButtonText: {
    color: isDarkMode ? '#1e1e1e' : '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default getStyles;
