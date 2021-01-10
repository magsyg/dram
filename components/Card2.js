import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';


import Colors from '../constants/colors';


export default class Card2 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
    return (
        <View style={ {...styles.card,height: this.props.h}}  >
            <Text style={styles.tittel}> Dram! </Text>
            <Image style={{width: 100, height: 100, margin: 12}} source={require('../assets/logo.png')}/>
            <Text style={{...styles.tittel,fontSize: 20}}> Swipe til høyre for å starte</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        
        backgroundColor: Colors.darkest,
 
        borderRadius: 15,
        borderWidth: 8,
        borderColor: Colors.darkest,

        borderRadius: 15,     
        borderStyle: 'solid',
        backgroundColor: Colors.darker,
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tittel: {
        textAlign: 'center',
        color: 'white',
        fontSize: 80,

        fontFamily: 'b',
        includeFontPadding: false,
        
    },
    question: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 22,
        
    },
});
