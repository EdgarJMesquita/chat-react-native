import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 50,
    padding: 15,
    borderRadius: 15,
    marginBottom: 5,
    justifyContent: 'center',
    backgroundColor: theme.color.secondary
  },

  title: {
    color: '#FFFFFF'
  }
});