/*  import { createStackNavigator } from '@react-navigation/stack';*/
import React from 'react';
import {Image,StyleSheet} from 'react-native';
import Search from './../components/Search';
import FilmDetail from './../components/FimlDetail';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from './../components/Favorites';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

function SearchStackNavigator() {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Detail" component={FilmDetail} />
    </Stack.Navigator>

  );
}

const Tab = createBottomTabNavigator();

function MoviesTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = focused ? 'ios-search': 'ios-search';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'ios-heart' : 'ios-heart-empty';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: 'gray',
        showLabel: false, showIcon : true,
        activeBackgroundColor:'#DDDDDD',
        inactiveBackgroundColor:'#FFFFFF'
      }}
     
     >
        <Tab.Screen name="Search" component={SearchStackNavigator}/>
        <Tab.Screen name="Favorites" component={Favorites}/>
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default MoviesTabNavigator;
