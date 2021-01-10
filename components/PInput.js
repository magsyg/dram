import React from 'react';
import {View,  StyleSheet, TextInput} from 'react-native';
import { FAB } from 'react-native-paper';
import Colors from '../constants/colors';
export default class PInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          entered:'',
        };
    }
    addP = () => {
        if(this.state.entered.length!=0) {
        this.props.addP(this.state.entered);
        this.setState({entered:''});
    }
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Legg til spiller" style={styles.input} placeholderTextColor="#fff" onChangeText={ (e)  => this.setState({entered: e})} value ={this.state.entered} />
                    <FAB icon="plus" large style={styles.btn} onPress={this.addP} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal:10,
        padding: 1,
        margin: 5
    },
    input: {
        height: 40,
        borderColor: Colors.light,
        color: 'white',
        borderBottomWidth: 2,
        fontSize: 20,
        padding: 5,
        width: '70%',
        fontFamily: 'b',
        includeFontPadding: false,
        padding:0
    },
    inputContainer: {
        marginHorizontal:20,
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems: 'center'
    },
    btn : {
        backgroundColor: Colors.light2
    }
});