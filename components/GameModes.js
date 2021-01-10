import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../constants/colors';

const GameMode = props => {
    return (
        <TouchableOpacity style={{...styles.card, ...props.style}} onPress={props.onPress}>
            <View>
            {props.children}
            </View>
        </TouchableOpacity>
        );
};
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
        
        padding: 20,
        paddingTop:5,
        
        backgroundColor: Colors.dark,
        width: "80%",
        
        borderColor: Colors.light,
        borderWidth: 2,
        borderRadius: 16,

        marginVertical: 4
    }
});

export default GameMode;