import React, { Component} from 'react';
import { Dimensions } from 'react-native';
import { TouchableWithoutFeedbackBase } from 'react-native';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import { ListItem } from 'react-native-elements';
import {SwipeListView} from "react-native-swipe-list-view"
import {db } from "../config"

export default class SwipableFlatList extends Component{

    constructor(props){
        super(props)
        this.state={
            allNotifications:this.props.allNotifications,

        }
    }
    onSwipeValueChange=swipeData=>{
        var allNotifications =this.state.allNotifications;
        const {key,value}= swipeData;
        if(value<-Dimensions.get("window").width){
            const newData=[...allNotifications];
            this.updateMarkAsRead(allNotifications[key])
            newData.splice(key,1)
            this.setState({
                allNotifications:newData
            })
        }
    }
    updateMarkAsRead=notification=>{
        db.collection("all_notifications")
        .doc(notification.doc_id)
        .update({
            notification_staus:"read"

        })
    }
    renderItem=data=>{
        <ListItem 
        leftElement={<Icon name="book " type='font-awesome' color='696969' />}
        title={data.item.book_name}
        titleStyle={{color:'black',fontWeight:"bold"}}
        subtitle={data.item.message}
        bottomDivider
        />
    }
    renderHiddenItem=()=>{
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn,styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>


                </Text>
            </View>
        </View>
    }
    render(){
        return(
            <View style={styles.container}>
                <SwipeListView 
                disableRightSwipe
                data={
                    this.state.allNotifications

                }
                renderItem={
                    this.renderItem

                }
                renderHiddenItem={
                    this.state.renderHiddenItem
                }
                rightOpenValue={
                   -Dimensions.get('window'.width)
                }
                previewRowKey={
'0'
                }
                previewOpenValue={
'-40'
                }
                previewOpenDelayt={
                3000
            }
            onSwipeValueChange={
                this.onSwipeValueChange
            }
                />
            </View>
            )
    }
}