import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    backgroundColor: '#373747',
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginLeft: 15
  }
});