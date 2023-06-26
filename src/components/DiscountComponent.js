import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, Linking } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import CheckIcon from 'react-native-vector-icons/AntDesign'


export default DiscountComponent = ({item}) => {
    const [check, setCheck] = useState(false)

    return (
        <>
            {
                check ? <TouchableOpacity
                    onPress={() => setCheck(!check)}
                    style={{ borderWidth: 1, borderColor: 'black', height: heightToDp('4%'), width: widthToDp('40%'), borderRadius: 200, justifyContent: 'space-evenly', alignItems: 'center', marginLeft: widthToDp('5%'), flexDirection: 'row' }}>
                    <Text style={{ color: 'black' }}>{item.discountName}</Text>
                    <CheckIcon
                        name='check'
                        size={25}
                        color={'black'}
                    />
                </TouchableOpacity> : <TouchableOpacity
                    onPress={() => setCheck(!check)}
                    style={{ borderWidth: 1, borderColor: 'black', height: heightToDp('4%'), width: widthToDp('40%'), borderRadius: 200, justifyContent: 'space-evenly', alignItems: 'center', marginLeft: widthToDp('5%'), flexDirection: 'row' }}>
                    <Text style={{ color: 'black' }}>{item.discountName}</Text>

                </TouchableOpacity>
            }
        </>
    )
}