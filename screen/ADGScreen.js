import React from 'react';
import {Text, View, Alert, StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';


import Colors from '../constants/colors';
import PurpleButton from '../components/PurpleButton';
import AddPlayers from '../components/AddPlayers';

import * as ScreenOrientation from 'expo-screen-orientation'

  async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
const ADGSCREEN = props => {
   if(ScreenOrientation.getOrientationAsync()!=ScreenOrientation.Orientation.PORTRAIT) {
        changeScreenOrientation();
    }
    const switchScreen = () => {
        if(props.ps.length>=2) {
        props.gM();
        } else {
            Alert.alert('STOP!',
            'Dere må minst være 2 spillere for å starte spillet');
        }
    }
    return(
        <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
            <View style={styles.container}>
                <View style={{padding:0}}><Text style={styles.gameTitle}> Legg til spillere </Text></View>
                <AddPlayers ps={props.ps} addP={props.addP} removeP={props.removeP}/>
                <PurpleButton title="Fortsett" style={{margin:32}} fontSz={styles.btntxt} onPress={switchScreen}/>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
    },
    gameTitle: {
        fontSize: 50,
        color: 'white',
        fontFamily: 'b',
        includeFontPadding: false,
        margin: 10
    },
    btntxt: {
        fontSize: 54
    }
});

export default ADGSCREEN;