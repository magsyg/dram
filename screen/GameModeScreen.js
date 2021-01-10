import React from 'react';
import {Text, View,StyleSheet} from 'react-native';

import Colors from '../constants/colors';
import GameMode from '../components/GameModes';
import PurpleButton from '../components/PurpleButton';

import * as ScreenOrientation from 'expo-screen-orientation'

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

const GameModeScreen = props => {
    if(ScreenOrientation.getOrientationAsync()!=ScreenOrientation.Orientation.PORTRAIT) {
        changeScreenOrientation();
    }
    return(
            <View style={styles.container}>

                <View style={{padding:0, margin: 12}}><Text style={styles.gameTitle}>Spilltyper </Text></View>
                <GameMode style={styles.g1} onPress={()=>props.wGameMode(1)}>
                    <Text style={styles.txtTitle}>Klassisk</Text>
                    <Text style={styles.txt}>Null aktivitet</Text>
                    <Text style={styles.txt}>Bare enkle spørsmål</Text>
                </GameMode>
                <GameMode style={styles.g2} onPress={()=>props.wGameMode(0)}>
                    <Text style={styles.txtTitle}>Basic</Text>
                    <Text style={styles.txt}>Et helt vanlig spill</Text>
                </GameMode>
                <GameMode style={styles.g3}  onPress={()=>props.wGameMode(2)}>
                    <Text style={styles.txtTitle}>Aktivt</Text>
                    <Text style={styles.txt}>Flere aktiviteter</Text>
                    <Text style={styles.txt}>Flere grovere spørsmål</Text>
                </GameMode>
                <View style={styles.button}>
                 <PurpleButton style={styles.button} title='Tilbake' onPress={()=>props.back(0)}/>
                 </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
    },
    gameTitle: {
        fontSize: 76,
        color: 'white',
        fontFamily: 'b',
        includeFontPadding: false,
    },
    button: {
        marginTop:24
    },
    btntxt: {
        fontSize: 54
    },
    txt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    txtTitle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 32,
        fontFamily: 'b',
        includeFontPadding: false,
        marginTop: 16
    },
    g1: {
        backgroundColor: Colors.light3,
        borderColor: Colors.sLight
        },
    g2: {
        backgroundColor: Colors.primary
    },
    g3: {
        backgroundColor: Colors.blueish2
    },
});

export default GameModeScreen;