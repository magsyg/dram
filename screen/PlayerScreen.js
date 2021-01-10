import React from 'react';
import {Text, View, Alert, StyleSheet, Keyboard, TouchableWithoutFeedback, Platform} from 'react-native';

import Colors from '../constants/colors';
import PurpleButton from '../components/PurpleButton';
import AddPlayers from '../components/AddPlayers';

import * as ScreenOrientation from 'expo-screen-orientation'

  async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
const PlayerScreen = props => {
   if(ScreenOrientation.getOrientationAsync()!=ScreenOrientation.Orientation.PORTRAIT) {
        changeScreenOrientation();
    }
    const switchScreen = () => {
        if(props.ps.length>=2) {
        props.gM(1);
        } else {
            Alert.alert('STOP!',
            'Dere må minst være 2 spillere for å starte spillet');
        }
    }
    return(
        <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
            <View style={styles.container}>
                <View style={{padding:0, margin: 20}}><Text style={styles.gameTitle}> DRAM! </Text></View>
                <AddPlayers ps={props.ps} addP={props.addP} removeP={props.removeP}/>
                <PurpleButton title="Start" fontSz={styles.btntxt} onPress={switchScreen}/>
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
        marginTop: Platform.OS === 'ios' ? 2 : 0,
        fontSize: 100,
        color: 'white',
       fontFamily: 'b',
       includeFontPadding: false
    },
    btntxt: {
        fontSize: 54
    }
});

export default PlayerScreen;