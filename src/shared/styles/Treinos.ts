import { StyleSheet } from "react-native";
import { ThemeColors } from "../theme";

export const getStyles = (theme: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    backgroundColor: theme.primary,
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
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
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
    backgroundColor: theme.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: theme.shadow,
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
    borderBottomColor: theme.divider,
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
    color: theme.text,
    flex: 1,
  },
  treinoDia: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  treinoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  treinoInfo: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: '600',
  },
});

export default getStyles;
