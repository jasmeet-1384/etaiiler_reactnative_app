import React,{useEffect} from 'react'
import { View, Text } from 'react-native'
import Navigation from './src/navigation/Navigation'
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux'
import store from './src/store/index'

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </Provider>
  )
}

export default App