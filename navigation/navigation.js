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


const StackSearch = createStackNavigator();

function SearchStackNavigator() {
  return (

    <StackSearch.Navigator>
      <StackSearch.Screen name="Search" component={Search} />
      <StackSearch.Screen name="FilmDetail" component={FilmDetail} />
    </StackSearch.Navigator>

  );
}

const StackFavorites = createStackNavigator();

function FavoritesStackNavigator() {
  return (

    <StackFavorites.Navigator>
      <StackFavorites.Screen name="Favories" component={Favorites} />
      <StackFavorites.Screen  name="FimDetail" component={FilmDetail} />
    </StackFavorites.Navigator>

  );
}

const TabMovies = createBottomTabNavigator();

function MoviesTabNavigator() {
  return (
    <NavigationContainer>
      <TabMovies.Navigator
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
        <TabMovies.Screen name="Search" component={SearchStackNavigator}/>
        <TabMovies.Screen name="Favorites" component={FavoritesStackNavigator}/>
        
      </TabMovies.Navigator>
    </NavigationContainer>
  );
}
export default MoviesTabNavigator;
