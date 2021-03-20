import React ,{Component}from 'react';
import { Text,View,TouchableOpacity,TextInput, Image,StyleSheet,KeyboardAvoidingView,Modal,ScrollView ,Alert } from 'react-native';
import * as firebase from 'firebase'
import db from '../config.js'
import {MyHeader} from '../Components/MyHeader'


export default class MyDonationScreen extends Component {
    constructor(){
        super();
        this.state={
donorId:firebase.auth().currentUser.email,
donorName:"",
allDonations:[],

        }
        this.requestRef=null
    }
    static navigationOptions={
        header:null
    }
    getDonorDetails=(donorId)=>{
        db.collection("users")
        .where("email_id","==",donorId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    "donorName":doc.data().first_name+" "+doc.data().last_name

                })
            })
        })
    }
    getAllDonations=()=>{
this.requestRef=db.collection("all_donations").where("all_donations").where("donor_id","==",this.state.donorId)
.onSnapshot((snapshot)=>{
var allDonations=[]
snapshot.docs.map((doc)=>{
    var donation=doc.data()
    donation ["doc_id"]=doc.doc_id
    allDonations.push(donation)
    this.setState({
        allDonations:allDonations

    })
})
})
    }
    sendBook=(bookDetails)=>{
if(bookDetails.request_status==="Book Sent"){
var requestStatus="Donor Interested"
db.collection("all_donations").doc(bookDetails.doc_id).update({
    "request_status": "Donor Interested"
})
this.sendNotification(bookDetails,requestStatus)
}
else{
    var requestStatus="Book Sent"
    db.collection("all_donations").doc(bookDetails.doc_id).update({
        "request_status":"Book Sent"
    })
    this.sendNotification(bookDetails,requestStatus)
}
    }
    sendNotification=(bookDetails,requestStatus)=>{
var requestId =bookDetails.request_id
var donorId = bookDetails.donor_id
db.collection("all_notifications")
.where("request_id","==",requestId)
.where("donor_id","==",donorId)
.get()
.then((snapshot)=>{
    snapshot.forEach((doc)=>{
        var message =""
        if(requestStatus==="Book Sent"){
message = this.state.donorName+"sent you Book"
        }
        else{
            message =this.state.donorName+"Has Shown Interent In Donating The Book"
        }
        db .collection("all_notifications").doc(doc.id).update({
            "message":message,
           " notification_status":"unread",
           "date":firebase.fireStore.FieldValue.serverTimestamp ()
        })
    })
})
    }
    componentDidMount(){
        this.getDonorDetails(this.state.donorId)
        this.getAllDonations()
    }
    componentWillUnmount(){
        this.requestRef();

    }
    keyExtractor=(item,index)=>index.toString()

    renderItem=({item,i})=>{
<ListItem 
key={i}
title={item.book_name}
subtitle={"Requested By:"+item.requeste_by+"\nStatus : "+item.request_status}
leftElement ={<Icon name="book" type="font-awesome" color='#696969'/>}
titleStyle={{color:'black',fontWeight:'bold'}}
rightElement={
    <TouchableOpacity style={[styles.button,
    {
        backgroundColor:item.request_status==="Book Sent"?"green":"#ff5722"
    }
    ]}
    onPress={()=>{
        this.sendBook(item)
    }}
    >
<Text style={{color:'#ffff'}}>
{item.request_status==="Book Sent"?"Book Sent":"Send Book"}
</Text>
    </TouchableOpacity>
}

/>
    }

   
}