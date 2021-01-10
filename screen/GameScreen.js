import React  from 'react';
import {View, StyleSheet, PanResponder, Animated, Dimensions} from 'react-native';
import {IconButton} from 'react-native-paper';
import Colors from '../constants/colors';
import Card from '../components/Card';
import Card2 from '../components/Card2';

import * as ScreenOrientation from 'expo-screen-orientation'

const widthS = (Dimensions.get('window').height>Dimensions.get('window').width) ? Dimensions.get('window').height:Dimensions.get('window').width;
const heightS = (Dimensions.get('window').height<Dimensions.get('window').width) ? Dimensions.get('window').height:Dimensions.get('window').width;

const cPos= Math.floor(widthS-widthS*0.925);

export default class GameScreen extends React.Component {
        constructor(props) {
          super(props);
          this.state = {dataLoaded: false, 
            number: 0 + props.curQ,
            swipedNr: 0 + props.curQ,
            qnr: 0 + props.curQ, 
            xValue1: new Animated.Value(cPos),
            xValue2: new Animated.Value(0),
        }
        this.panResponder = PanResponder.create({

            onMoveShouldSetPanResponder:(evt,gestureState) => 
            {return (gestureState.dx<-40) || (gestureState.dx>10);
            },
            onStartShouldSetPanResponder:(evt,gestureState) => {
                return(true);
            },
            onPanResponderRelease:(evt,gestureState)=> {
                if(gestureState.dx>60)  {
                    this.onSwipeRight();
                    return;
                } else if(gestureState.dx<-60) {
                    this.onSwipeLeft(); 
                    return;
                }
                if(gestureState.x0>widthS-widthS/3)  {
                    this.onSwipeRight();
                } else if(gestureState.x0<widthS/3) {
                    this.onSwipeLeft(); 
                }
            },
        });
        }

        async componentDidMount() {;
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);     }

        onSwipeRight = () => {
            if(this.state.qnr<this.props.q.length-1) {
                this.setState(prevState => ({
                    swipedNr: prevState.qnr,
                    qnr: prevState.qnr+1,
                    number: prevState.qnr+1
                }))
                this.props.qr(this.state.qnr+1);
                Animated.parallel([
                    Animated.timing(
                        this.state.xValue1, {
                            toValue:  cPos,
                            duration: 0
                        }
                    ),
                    Animated.timing(
                        this.state.xValue2, {
                            toValue:  cPos,
                            duration: 0
                        }
                    )
                ]).start();
                Animated.parallel([
                    Animated.timing(
                        this.state.xValue1, {
                            toValue: widthS,
                            duration: 400
                        }
                    ),
                    Animated.timing(
                        this.state.xValue2, {
                            toValue: -widthS,
                            duration: 400
                        }
                    )
                ]).start();

            } else {
                this.props.gM(0);
            }
        }

        onSwipeLeft = () => {           
        if(this.state.qnr>0) {
            this.setState(prevState => ({
                number: prevState.qnr,
                qnr: prevState.qnr-1,
                swipedNr: prevState.qnr-1
            }))
            this.props.qr(this.state.qnr-1);
            Animated.parallel([
                Animated.timing(
                    this.state.xValue1, {
                        toValue: widthS*1.5,
                        duration: 0
                    }
                ),
                Animated.timing(
                    this.state.xValue2, {
                        toValue: -widthS*1.5,
                        duration: 0
                    }
                )
            ]).start();
            Animated.parallel([
                Animated.timing(
                    this.state.xValue1, {
                        toValue:  cPos,
                        duration: 400
                    }
                ),
                Animated.timing(
                    this.state.xValue2, {
                        toValue:  cPos,
                        duration: 400
                    }
                )
            ]).start();
        }
        }


    render() {
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: Colors.primary,
                alignItems: 'center',
            },
            card:{
                zIndex: 1,
                position: 'absolute', 
                left: cPos,
                top:Math.floor(heightS-heightS*0.925),
                bottom:Math.floor(heightS-heightS*0.925),

                width: (Math.floor(widthS*0.85)),
            },
            buttons: {
                zIndex:3,
                position: 'absolute'
            },
        
        });

    return(
        <View style={styles.container} {...this.panResponder.panHandlers}>
            <IconButton
            icon="arrow-left"
            color={'white'}
            size={32}
            onPress={()=>this.props.gM(0)}
            style={{...styles.buttons,left:0,top:0}}
            />
            <IconButton
            icon="plus"
            color={'white'}
            size={32}
            onPress={()=>this.props.gM(3)}
            style={{...styles.buttons,right:0,top:0}}
            />
 
            <Animated.View style={{...styles.card, left: this.state.xValue1, right:this.state.xValue2, zIndex: 2}}>
            {(this.state.swipedNr===0) ?  <Card2 h={(Math.floor(heightS*0.85))}/>:<Card values={this.props.q[this.state.swipedNr]} h={(Math.floor(heightS*0.85))}/>}
            </Animated.View>
            <View style={styles.card}>
            <Card values={this.props.q[this.state.number]} h={(Math.floor(heightS*0.85))} />
            </View>
        </View>
    );
    }
}

