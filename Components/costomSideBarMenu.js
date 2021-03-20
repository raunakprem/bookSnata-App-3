import React,{Component} from 'react';
import { Text,View,TouchableOpacity,TextInput, Image,StyleSheet,KeyboardAvoidingView,Modal,ScrollView ,Alert } from 'react-native';
import * as firebase from 'firebase'
import {DrawerItems} from 'react-navigation-drawer'
import {Avatar} from 'react-native-Elements'
import * as ImagrPicker from 'expo-image-picker'
import { ImagePickerIOS } from 'react-native';
import { set } from 'react-native-reanimated';

export default class CustomSideBarMenu extends Component{
    state={
        userId:firebase.auth().currenUser.email,
        image :'#',
        name:"",
        docId:"",

    }
    selectPicture=async()=>{
const {cancelled,uri}=await ImagePicker.launchImageLiberaryAsync({
midiaTypes:ImagePicker.MediaTypeOptions.All,
allowsEditing:true,
aspect:[4,3],
quality:1,
})
if(!cancellled){
    this.setState({
        image:uri
    })
this.uploadImage(uri,this.state.userId)
}
    }
    uploadImage=async(uri,imageName)=>{
        var response =await fetch(uri)
        var blob =await response.blob()

var ref =firebase

.storage()
.ref()
.child("user_profiles/"+imageName)
return ref.put(blob).then((response)=>{
    this.fetchImage(imageName)

})
    }
    render (){
        return(
            <View style ={styles.container}>
                <View>
<Avatar 
rounded
source ={{
uri:this.state.image
}}
size ='medium'
omPress ={()=>{
    this.selectPicture
}}
containerStyle={styles.imageContainer}
showEditButton

/>
<Text style ={{fontWeight:"100",fontSize:20,paddingTop:10}}>
    {this.state.name}
</Text>


                </View>
                <View style ={drawerItemsContainer}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style ={styles.logoutContainer}>
                    <TouchableOpacity style ={styles.logoutBotton}
                    onPress={()=>{
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut()
                    }}
                    >
                        <Text >
Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}