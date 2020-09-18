import React from 'react';
import { TextInput, Button, View, StyleSheet, FlatList, Image, Text,TouchableOpacity } from 'react-native';
import films from './../helpers/fimlDatas';
import {getImageFromApi} from './../api/TMDBApi';
export default class FilmItems extends React.Component {



    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {
          // Si la props isFilmFavorite vaut true, on affiche le 🖤
          return (
            <Image
              style={style.favorite_image}
              source={require('./../images/ic_favorite.png')}
            />
          )
        }
      }
    render() {
        console.log(this.props.film);
       /*  const film = this.props.film; // la donnée du passé depuis le composant parent
        const displayDetailForFilm=this.props.displayDetailForFilm; */
        const {film,displayDetailForFilm}=this.props;


        return (
            <TouchableOpacity 
                onPress={()=>displayDetailForFilm(film.id)} // le passade des valeurs reels
                style={style.main_container}>
                <Image
                    style={style.image}
                    source={{ uri: getImageFromApi(film.poster_path) }}
                />
                <View style={style.content_container}>
                    <View style={style.header_container}>
                        {this._displayFavoriteImage()}
                        <Text style={style.title_text}>{film.title}</Text>
                        <Text style={style.vote_text}>{film.vote_average}</Text>
                    </View>
                    <View style={style.description_container}>
                        <Text style={style.description_text} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={style.date_container}>
                        <Text style={style.date_text} >Sortie {film.release_date}</Text>
                    </View>
                </View>


            </TouchableOpacity>
        )
    }
}

const style = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
      }
});
