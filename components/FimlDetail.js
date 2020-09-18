import React from 'react'
import { Text, View, StyleSheet,Image, ActivityIndicator, ScrollView } from 'react-native'
import { getFilmDetailFromApi,getImageFromApi } from './../api/TMDBApi';
import {connect} from 'react-redux'; // va permettre les abonnements
import moment from 'moment';
import numeral from 'numeral';
import { TouchableOpacity } from 'react-native-gesture-handler';

class FilmDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            film: undefined,
            isLoading: true
        }
    }
    // methode pour afficher le detail d'un film
    _toggleFavorite(){
        const action={type:"TOGGLE_FAVORITE",value:this.state.film}
        this.props.dispatch(action)// il va renvoyer l'action a mon Store donc a favoriteReducer
    }
    _displayFavoriteImage(){
        var sourceImage=require('./../images/ic_favorite_border.png');
        if(this.props.favoritesFilm.findIndex((film)=>film.id=== this.state.film.id)!==-1){ // comparaison de l'id du film dans les favoris aux films du state normal 
            // film est deja dans nos favoris
            sourceImage=require('./../images/ic_favorite.png');
        }

        return(
            <Image
                source={sourceImage}
                style={styles.favorite_image}
            />
        )
    }
    _displayFilm() {
        const { film } = this.state
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{ uri: getImageFromApi(film.backdrop_path) }}
                    />
                    <TouchableOpacity 
                     onPress={()=>this._toggleFavorite()}
                      style={styles.favorite_container}
                     >
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.title_text}>{film.title}</Text>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map(function (genre) {
                        return genre.name;
                    }).join(" / ")}
                    </Text>
                    <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function (company) {
                        return company.name;
                    }).join(" / ")}
                    </Text>
                </ScrollView>
            )
        }
    }
    _displayLoading() { // Ouh !!! methode qui retourne du jsx je suis appeler dans render() mais je rend chargement si et seulement si je vaut true
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }
    /*  <Text>Detail du film {this.props.route.params.idFilm}</Text> tres important pour recuperer un paramettre passé depuis navigate */
    render() {
        console.log("*************Red FILMDETAIL");
        console.log(this.props);
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )
    }
    componentDidMount() { // methode qui faire partir du cycle de vie d'un composant react-native au meme titre que constructor(),render()
        console.log("*************Did");
        getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            });
        })
    }
    componentDidUpdate(){
        console.log(this.props.favoritesFilm);
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center',
    },
    favorite_image:{
        width:40,
        height:40
    }
})
// TRES IMPORTANT QUAND UN PROPS CHANGE l'APP SE REREND donc "MISE A JOUR DES COMPOSANT ABONNEE"
const mapStateToProps = (state) =>{ // il va permettre de connecter les données du state globale aux props du composant FilmDetail
    return { // je vais specifier les données du state globale qui m'interresse
         favoritesFilm : state.favoritesFilm
    }
}
export default connect(mapStateToProps)(FilmDetail); // Abonement effectuer avec les données du state globale donc depuis reducers mapé (favoritesFilm)