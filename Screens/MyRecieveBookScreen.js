import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../Components/MyHeader';

export default class MyRecievedBookSvreen extends Component{
    constructor(){
      super()
      this.state={
          user_id:firebase.auth().currentUser.email,
          recievedBooksList:[]
        
      }
      this.requestRef=null
    }
    componentDidMount(){
        this.getrecievedBooksList()
    }

    getrecievedBooksList=()=>{
        this.requestRef=db.collection("requested_books")
        .where("user_id","==",this.state.user_id)
        .where("book_status","==","recieved")
        .onSnapshot((snapshot)=>{
            var recievedBooksList=snapshot.docc.map((doc)=>{
                doc.data()

            })
            this.setState({
                recievedBooksList:recievedBooksList

            })
        })
    }
}