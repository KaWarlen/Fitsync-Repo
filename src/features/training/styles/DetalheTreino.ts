import { StyleSheet } from "react-native";
import { ThemeColors } from "../../../shared/theme";

export const getStyles = (theme: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    backgroundColor: theme.primary,
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
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  progressContainer: {
    backgroundColor: theme.card,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.divider,
  },
  progressInfo: {
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: theme.text,
    fontWeight: '600',
    marginBottom: 8,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  completedText: {
    fontSize: 14,
    color: theme.success,
    fontWeight: '600',
    marginLeft: 6,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: theme.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.success,
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  exercicioCard: {
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: theme.border,
    shadowColor: theme.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  exercicioCardConcluido: {
    borderColor: theme.success,
    backgroundColor: theme.primaryLight,
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
    color: theme.text,
    flex: 1,
  },
  exercicioNomeConcluido: {
    color: theme.success,
    textDecorationLine: 'line-through',
  },
  exercicioDetalhes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.divider,
  },
  detalheItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detalheText: {
    fontSize: 14,
    color: theme.textSecondary,
    fontWeight: '500',
  },
  footer: {
    backgroundColor: theme.card,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.divider,
  },
  finalizarButton: {
    backgroundColor: theme.success,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: theme.success,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  finalizarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default getStyles;
