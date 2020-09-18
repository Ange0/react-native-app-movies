import React from 'react'
import {Text,View,StyleSheet,Animated,ActivityIndicator, Dimensions} from 'react-native'
// va permettre cette animation en plusier endroid de l'application
export default class FadeIn extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            positionLeft:new Animated.Value(Dimensions.get('window').width)
        }
    }

    // quand le composant est monté
    componentDidMount(){
        Animated.spring(
            this.state.positionLeft,
            {
                toValue:0
            }
        ).start()
    }
    render(){ {/* très important quand un composant sera appelé commme composant parent (en faite il doit retourné les enfants qu'il encapsule) */}
        return (
            <Animated.View style={{left:this.state.positionLeft}}>
                {this.props.children}
            </Animated.View>
        )
    }

}

const mySytle=StyleSheet.create({
    bordure:{
        margin:40
    },
    title:{
        fontSize:22,
        marginBottom:20
    }
})