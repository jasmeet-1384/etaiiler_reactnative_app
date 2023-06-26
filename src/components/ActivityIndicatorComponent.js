import React, { useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'

export default ActivityIndicatorComponent = (props) => {
    return(
        <ActivityIndicator
        size={props.size}
        color = {props.color}
        />
    )
}