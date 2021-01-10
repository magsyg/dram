import React from 'react';
import {StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper'
import Colors from '../constants/colors';

const PlayerComp = props => {

    return(
        <Chip onPress={props.removeP.bind(this, props.id)} style={styles.container}
        textStyle={styles.title} mode='outlined'>
            {props.title}
            </Chip>        
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.blueish,
        margin: 3,
        padding: 1,
        elevation: 5

    },
    title: {
        fontSize:16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    }, 

});

export default PlayerComp;