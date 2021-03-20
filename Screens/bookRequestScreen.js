import React,{Component} from 'react';
import { Text,View,TouchableOpacity,TextInput, Image,StyleSheet,KeyboardAvoidingView,Modal,ScrollView ,Alert } from 'react-native';
import * as firebase from 'firebase'
import db from '../config.js'
import MyHeader from '../Components/MyHeader'
import {BookSearch} from 'react-native-google-books'
import { Touchable } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';

export default class BookRequestScreen extends Component {
constructor(){
    super()
    this.state={
        userId:firebase.auth().currentUser.email,
        bookName:'',
reasonToRequest :"",

    }
}
async gettBooksFromApi (bookName){
    this.setState({
        bookName:bookName
    })
    if(bookName.length>2){
            var books = await BookSearch.searchbook(bookName,'AIzaSyAbrUrya9PyVcsLGD6Ya3tB1ybeT5FbzhY')
            this.setState({
                dataSource:books.data,
                showFlatlist:true

            })
    }
}

createUniqueId(){
    return Math.random().toString(36).substring(7);

}
componentDidMount(){
    var books = BookSearch.searchbook(bookName,'AIzaSyAbrUrya9PyVcsLGD6Ya3tB1ybeT5FbzhY')
    this.Bookrequest()
    this.isBookRequestActive()

}
updateBookRequestStatus=()=>{
db.collection('reqested_books').doc(this.state.docId)
.update({
    book_status:'recieved'

})
db.collection('users').where('email_id,"==",this.state.userId').get()
.then((snapshot)=>{
    snaopshot.forEach((doc)=>{
        db.collection('users').doc(doc.id).update({
            isBookRequestActive:false

        })
    })
})
}
sendNotification=()=>{
    db.collection('users').where("email_id","==",this.state.userId).get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            var name=doc.data().first_name
            var lastName=doc.data().last_name
            db.collection('all_notifications').where("request_id","==",this.state.userId).get()
            .then((snapshot)=>{
                snapshot.forEach((doc)=>{
                    var donorId =doc.data().donor_id
                    var bokkname= doc.data().book_name

                })
            
            })
            
            db.collection('all_notifications').add({
"targeted_user_id":donorid,
"message":name+" "+lastName+" Received The Book"+bookName
"notification_status":"unread"
"book_name":bookName
            })

        })
    })

}

addRequest=(bookName,reasonToRequest)=>{
var userId = this.state.userId
var randomRequestId = this.createUniqueId()
var books =BookSearch.searchbook(bookName,'AIzaSyAbrUrya9PyVcsLGD6Ya3tB1ybeT5FbzhY')
    db.colection('requested_books').add({
        "user_Id":userId,
        "book_name":bookName,
       "reason_to_request":reasonToRequest,
      "request_Id":randomRequestId,
      "book_status":"requested",
      "date":firebase.firestore.fieldvalue.serverTimestamp(),
      "image_link":books.data[0].volumeInfo.image_link.smallThumbnail

      
    
    })
    await this.getBookRequest()
    db.collection("users").where("email_id","==",userId).get()
    .then()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            db.colection('users').doc(doc.id).update({
                isBookRequestActive:true
            })
        })
    })

    this.setState({
        bookName:'',
        reasonToRequest:''
    })
    return alert.Alert("Book Requested succesfully")
    

}
getBookRequest=()=>{
    var bookrequest=db.colection('requested_books')
    .where("user_id","==",this.state.userId)
    .get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            if(doc.data().book_status!=="recieved"){
                this.setState({
                    requestId:doc.data().request_Id,
                    requestedBookName:doc.data().book_name
                    bookStatus:doc.data().book_status
                    docId:doc.id

                })
            }
        })
    })

}
getIsBookRequestActive=()=>{
    db.colection('users')
    .where('email_id',"==",this.state.userId)
    .onSnapshot(snapstot=>{
        snapshot.forEach(doc=>{
            this.setState({
                isBookRequestActive:doc.data().isBookRequestActive,
                userDocId:doc.id
            })
        })
    })

}

renderItem=({item,i})=>{
    return(
        <TouchableHighlight style={{alignItems:'center',backgroundColor:"#DDDDDD",padding:10,width:90%,}}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={()=>{
            this.setState({
                showFlatlist:false,
                bookName:item.volumeInfo.item,

            })
        }}
        bottomDivider
        >
            <Text>
                {item.item.volumeInfo.title}
            </Text>

            
        </TouchableHighlight>
    )
}
    render(){
               if(this.state.isBookRequestActive===true){
return(
    {this.state.showFlatlist?
        (<FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            enableEmptySections={true}
            style={{marginTop:10}}

            keyExtractor={(item,index)=>index.toString}
            / >)
        :(

        
        
    <View style={{flex:1.justifyContent:'center'}}>
        <View style ={{borderColor:"orange" ,borderWidth:2,justifyContent:"center",alignItems:"center",padding:10 ,margin:10}}>
            <Text>
                Book Name
            </Text>
            <Text>
{
    this.state.requestedBookName
}
            </Text>
        </View >
        <View style ={{borderColor:"orange" ,borderWidth:2,justifyContent:"center",alignItems:"center",padding:10 ,margin:10> 
            <Text>
Book Status
            </Text>
            <Text>
                {this.state.bookStatus}
            </Text>
        </View>
        <TouchableOpacity style={{borderWidth:1,borderColor:"orange",backgroundColor:"orange",width:300,alignSelf:"center",alignItems:"center",height:30,marginTop:30,}}
        onPress={()=>{
            this.sendNotification()
            this.updateBookRequestStatus()
            this.recievedBook(this.state.requestedBookName)
            
        }}
        >
            <Text>
                I recieved the book 
            </Text>
        </TouchableOpacity>
    </View>
)
        }
        else{           
        
        return(
            <View style ={{flex:1}}>
                <MyHeader title ="Request Book "/>
                <KeyboardAvoidingView style={StyleSheet.KeyboardStyle}>
                    <TextInput
                    style={StyleSheet.formText}
                    placeHolder={'Enter Book Name'}
onChangeText ={(text)=>{
this.setState({
    bookName:text
})
}}
                    />
                    <TextInput
                    style={[StyleSheet.formText,{heigth:300}]}
                    placeHolder={'Why Do You Need The Book '}
                    multiline
                    numberOfLines={8}
onChangeText ={(text)=>{
this.setState({
    resontoT:text
})
}}
                   />
                   <TouchableOpacity style = {styles.button}><Text>
                       Request
                       </Text></TouchableOpacity>
                </KeyboardAvoidingView>
                
            </View>
        )
)}
    }
}
        }
const styles = StyleSheet.create({ keyBoardStyle : { flex:1, alignItems:'center', justifyContent:'center' }, formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, }, button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, } )