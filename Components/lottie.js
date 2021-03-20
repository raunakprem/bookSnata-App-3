import React from 'react';
import LottieView from 'Lottie-react-native'

export default class LottieAnimation extends React.components{
    render(){
return(
    <LottieView 
    source = {require ('../assets/3154-books-2.json')}
    />
)
    }
}
