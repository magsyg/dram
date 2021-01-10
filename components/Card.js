import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';


import Colors from '../constants/colors';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

    

    return (

        <View style={{...styles.card,height:this.props.h}}  >
             <Text style={styles.tittel} adjustsFontSizeToFit minimumFontScale={.1} numberOfLines={1}>{this.props.values.title}</Text>
            <View style={styles.qC}>
                <Text style={styles.question}>{this.props.values.question}</Text>
                <Text style={styles.underQ}>{this.props.values.underQ}</Text>
            </View>
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
        
    },
    qC: {
        backgroundColor: 'white',
        flex: 1,
    
        borderBottomLeftRadius:10,
        borderBottomRightRadius: 10,

        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: "center",

        
    },
    tittel: {
        textAlign: 'center',
        color: 'white',
        fontSize: 54,
        fontFamily: 'u',
        padding: 16,
        marginTop: -10
    },
    question: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 22,
        
    },
    underQ: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 16 
    }
});
