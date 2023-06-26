import React from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import Header from '../components/Header'
import LocationIcon from 'react-native-vector-icons/Entypo'
import PencilIcon from 'react-native-vector-icons/AntDesign'
import WhatsappIcon from 'react-native-vector-icons/FontAwesome'
import Header2 from '../components/Header2'

export default AddProductScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header2 />
            <View style={{ backgroundColor: 'white', height: heightToDp('8%'), width: widthToDp('100%'), marginTop: heightToDp('4%'), alignItems: 'center', flexDirection: 'row' }}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJzfGVufDB8fDB8fA%3D%3D&w=1000&q=80' }}
                    style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginLeft: widthToDp('3%') }}
                />
                <TextInput
                    placeholder='Write a caption ...'
                    placeholderTextColor={'black'}
                    style={{ color: 'black', width: widthToDp('65%'), marginLeft: widthToDp('4%') }}
                />
                <Image
                    source={{ uri: 'https://www.ulcdn.net/images/products/338715/original/Madeleine_Floor_Lamp_Walnut_LP.JPG?1621323150' }}
                    style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 5, alignSelf: 'center' }}
                />
            </View>
            <View style={{ borderWidth: 0.5, borderColor: 'black', width: widthToDp('100%') }}></View>
            <TouchableOpacity style={{height:heightToDp('6%'),width:widthToDp('100%'),justifyContent:'center'}}>
                <Text style={{ color: 'black',marginLeft:widthToDp('3%') }}>Tag people</Text>
            </TouchableOpacity>
            <View style={{ borderWidth: 0.5, borderColor: 'black', width: widthToDp('100%') }}></View>
            <TouchableOpacity style={{height:heightToDp('6%'),width:widthToDp('100%'),justifyContent:'center'}}>
                <Text style={{ color: 'black',marginLeft:widthToDp('3%') }}>Add location</Text>
            </TouchableOpacity>
            <View style={{ borderWidth: 0.5, borderColor: 'black', width: widthToDp('100%') }}></View>
            <TouchableOpacity style={{height:heightToDp('6%'),width:widthToDp('100%'),justifyContent:'center'}}>
                <Text style={{ color: 'black',marginLeft:widthToDp('3%') }}>Add Reminder</Text>
            </TouchableOpacity>
            <View style={{ borderWidth: 0.5, borderColor: 'black', width: widthToDp('100%') }}></View>
            <TouchableOpacity style={{height:heightToDp('6%'),width:widthToDp('100%'),justifyContent:'center'}}>
                <Text style={{ color: 'black',marginLeft:widthToDp('3%') }}>Add music</Text>
            </TouchableOpacity>
            <View style={{ borderWidth: 0.5, borderColor: 'black', width: widthToDp('100%') }}></View>

        </View>
    )
}