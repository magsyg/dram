import React from 'react';
import {View, KeyboardAvoidingView, Text, StyleSheet, FlatList, ScrollView, ListView, ColorPropType} from 'react-native';

import Colors from '../constants/colors';
import PlayerComp from './PlayerComp';
import PInput from './PInput';

const AddPlayers = props => {
    return(
        <View style={styles.container}> 
        <KeyboardAvoidingView style={styles.addBox}  behavior={"height"}>
             <PInput addP={props.addP}/>
             <View style={styles.amountP}>
                <Text style={styles.standardtxt}> Antall Spillere: {props.ps.length}</Text>
             </View>
        </KeyboardAvoidingView>
        <View style={styles.addContainer}>
             <ScrollView>
            <View style={styles.fl}>
                 {(props.ps.length!=0) ? (props.ps.map((item, index) => (
                 <PlayerComp title={item.name} key={index} id={item.key} removeP={props.removeP}/>))
                 ):(<View style={styles.empty}>
                     
                     </View>)
                 }
                </View>
            </ScrollView>

         </View>
        </View>   
        
    );
}

const styles = StyleSheet.create({
    container: {
        height:'50%',
        borderRadius: 24,
        width: "90%",
 
    },
    addContainer: {
        
        borderBottomLeftRadius: 16,
        borderBottomEndRadius: 16,
        height: '75%',  
        alignItems: 'center',   
        marginTop: 12   
    },
    addBox: {
        backgroundColor: Colors.darker,
        borderRadius: 24,
        borderTopEndRadius: 24,
        borderTopLeftRadius: 24,
    },
    amountP: {
        backgroundColor: Colors.darkest,
        borderBottomEndRadius: 24,
        borderBottomLeftRadius: 24,
        paddingBottom: 4
    },
    standardtxt: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
       fontFamily: 'b',
       includeFontPadding: false,
       padding: 4
    }, spilleretxt: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,

    },
    empty: {

    },
    emptyTxt: {
        textAlign: 'center'
    },
    fl: {
       width: '100%',
       flexDirection:'row',
       justifyContent: 'center',
       alignItems: 'flex-end',
       alignContent:'flex-start',
       flexWrap: 'wrap'
    }
});

export default AddPlayers;