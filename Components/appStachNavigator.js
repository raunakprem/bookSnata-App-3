import React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import BookDonateScreen from '../Screens/BookDonateScreen'
import RecieverDetailsScreens '../Screens/RecieverDetailsScreens'

export const AppStackNavigator =createStackNavigator({
    BookDonateList:{
        screen:donationScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    RecieverDetails:{
        screen:RecieverDetailsScreens,
        navigationOptions:{
            headerShown:false
        }
    },
},
{
    InitialRouteName:'BookDonateList'
    
}
})