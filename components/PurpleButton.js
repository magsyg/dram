import React from 'react';
import {Text, StyleSheet, TouchableHighlight} from 'react-native';

import Colors from '../constants/colors';

const PurpleButton = props => {
    return (
       
        <TouchableHighlight style={{...styles.btn, ...props.extraS}} onPress={props.onPress} underlayColor={Colors.light} activeOpacity={0.9} >
            <Text style={styles.txt}>{props.title}</Text>
        </TouchableHighlight>
        );
};
const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.light2,
        padding:12,
        paddingHorizontal:32,
        

   
        borderColor: Colors.darkest,

        borderRadius: 100,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 10,
        margin: 12,

    },
    txt: {
        fontSize: 32,
        color: 'white',
        includeFontPadding: false, 
        padding:0
    }
});

export default PurpleButton;