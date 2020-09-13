/*  import { createStackNavigator } from '@react-navigation/stack';*/
import Search from './../components/Search'; 
 import FilmDetail from './../components/FimlDetail';  
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/*
const  searchStackNavigator=createStackNavigator({ // c'est la version anterieur
    Search:{ // definir l'ecran search
        screen:Search,
        navigationOptions:{
            tite: 'Rechercher'
        }

    }
});
*/
//export  default searchStackNavigator;
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={Search} />
       <Stack.Screen name="Detail" component={FilmDetail} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;