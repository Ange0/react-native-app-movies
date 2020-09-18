
import React from 'react';
import Navigation from './navigation/navigation';
import {Provider} from 'react-redux'; // sera charger de distribuer mon reducer qui se troure dans store

import Store from './store/configureStore';
export default function App() {
  return (// on va encapsuler notre application dans provider Tous ecrans peuvent  s'abonner maintenat a notre store exemple dans  Composnat filmDetail 
  <Provider store={Store}>
    <Navigation/> 
  </Provider>
  
  );
}
 



 /* import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;  */