import { StyleSheet, StatusBar } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    paddingTop: StatusBar.currentHeight,
    
  },
});