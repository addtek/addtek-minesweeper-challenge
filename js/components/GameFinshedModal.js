import React from 'react';
import { Animated, TouchableOpacity, Dimensions, Modal,View,Text, Easing } from 'react-native';
import Icon from './Icon';
import faceWin from '../assets/face_win.png';
import faceLost from '../assets/face_lost.png';
import faceAlive from '../assets/face_alive.png';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
class GameFinishedModal extends React.Component {
    state = {
        visible:true,
      scale:new Animated.Value(1),
      top: new Animated.Value(screenHeight)
    };
  
    componentDidMount() {
      this.toggleModal();
    }
  
    toggleModal = () => {
      Animated.spring(this.state.top, {
        toValue: (screenHeight/2)-100
        ,duration:1000,
        easing: Easing.out,
        useNativeDriver:false
        
      }).start();
      this.pulse()
    };
  
    closeModal = () => {
      Animated.spring(this.state.top, {
        toValue: screenHeight,
        useNativeDriver:false
      }).start();
    };
   pulse=()=>{
    Animated.sequence([
    Animated.spring(this.state.scale, {
        toValue: 1.4,
        duration: 250,
        useNativeDriver:false
      }),
      Animated.spring(this.state.scale, {
        toValue: 1,
        duration: 250,
        friction: 3,
        tension: 40,
        useNativeDriver:false
      })
    
    ]).start()
   }
    render() {
      const screenHeight = Dimensions.get('window').height;
      const screenWidth = Dimensions.get('window').width;
      let buttonAsset;

		switch (this.props.status) {
			case 'won':
				buttonAsset = faceWin;
				break;
			case 'lost':
				buttonAsset = faceLost;
				break;
			default:
				buttonAsset = faceAlive;
		}
      return (
        <Modal visible={this.state.visible} animated={true} animationType="slide" transparent={true} onRequestClose={()=>{this.setState({visible:!this.state.visible});this.props.requestClose()}}>
        <Animated.View style={{borderRadius:20, padding:10,top: this.state.top,zIndex:11,backgroundColor:"#D3D0CA",width: screenWidth/1.5,height:200,alignSelf:'center',transform: [
                            {
                                scale: this.state.scale
                            },

                        ]}}>
          {/* <TouchableWithoutFeedback onPress={()=>{this.setState({visible:!this.state.visible})}}> */}
          <View>
              <View style={{justifyContent:'center',alignContent:'center',width:screenWidth/1.5,height:100,padding:10}}>
                  <View style={{alignSelf:'center'}}><Text style={{fontWeight:"900",fontSize:30}}>{this.props.statusText}</Text></View>
                  <View style={{height:60,width:60,alignSelf:"center"}}>
                    <Icon source={buttonAsset} externalSource={true} width={40} height={40} />
                  </View>
              </View>
              <View style={{marginTop:20}}>
              <TouchableOpacity onPress={()=>{this.setState({visible:!this.state.visible});this.props.restart()}}><View style={{backgroundColor:'#4a752c',width:screenWidth/2.5,height:50,justifyContent:"center",alignSelf:'center',alignContent:"center",alignItems:'center',borderRadius:10}}><Text style={{color:"#fff"}}>Retry</Text></View></TouchableOpacity>
              </View>
          </View>
          {/* </TouchableWithoutFeedback> */}
         </Animated.View>
        </Modal>
      );
    }
  }

  
  export default GameFinishedModal;