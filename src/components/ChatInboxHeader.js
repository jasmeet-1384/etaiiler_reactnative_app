import React from 'react'
import { View, Text,Image } from 'react-native'
import { heightToDp, widthToDp } from './Responsive'
import LeftIcon from 'react-native-vector-icons/AntDesign'
import MessageIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import DotIcon from 'react-native-vector-icons/Entypo'

export default ChatInboxHeader = (props) => {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: '#131127', width: widthToDp('100%'), height: heightToDp('8%'), justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row',alignItems:'center' }}>
                <LeftIcon
                    name='left'
                    color={'white'}
                    size={25}
                    style={{ marginLeft: widthToDp('5%') }}
                    onPress={() => navigation.goBack()}
                />
                <Image
                    source={{ uri: props.image }}
                    style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginTop: heightToDp('0%'), marginLeft: widthToDp('3%') }}
                />
                <View style={{marginLeft:widthToDp('3%')}}>
                    <Text style={{color:'white'}}>{props.name}</Text>
                    {/* <Text>username</Text> */}
                </View>
            </View>
        </View>
    )
}