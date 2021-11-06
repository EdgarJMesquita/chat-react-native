import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#232635',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    marginBottom: 50
  },

  input: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#373747',
    alignItems: 'center',
    paddingLeft: 15,
    color: '#FFFFFF'
  },

  button: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#00af9c',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },

  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.75
  }
});