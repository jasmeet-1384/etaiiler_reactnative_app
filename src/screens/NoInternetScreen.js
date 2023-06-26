import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'

export default NoInternetScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            <Image
                source={require('../../assets/no.jpeg')}
                style={{height:heightToDp('100%'),width:widthToDp('100%')}}
                resizeMode='contain'
            />
        </View>
    )
}