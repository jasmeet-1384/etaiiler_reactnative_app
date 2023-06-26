import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, PermissionsAndroid } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import PencilIcon from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'


export default SelectLanguageScreen = ({ navigation }) => {

    const [selected, setSelected] = useState('')

    useEffect(() => {
        requestLocationPermissionFunction()
    }, [])
    const requestLocationPermissionFunction = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Etaiiler location Permission",
                    message:
                        "Etaiiler needs access to your location ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
            } else {
                console.log("location permission denied");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const LanguageSet = [{ value: '0', language: 'ENGLISH' },
    { value: '1', language: 'HINDI' }, { value: '2', language: 'ODIYA' },
    { value: '3', language: 'KANNADA' }, { value: '4', language: 'TELUGU' },
    { value: '5', language: 'TAMIL' }, { value: '6', language: 'BENGALI' },
    { value: '7', language: 'MARATHI' }, { value: '8', language: 'MALAYALAM' },
    { value: '9', language: 'GUJARATI' }, { value: '10', language: 'PUNJABI' },
    { value: '11', language: 'ASSAMESE' }]

    const selectFunction = (value) => {
        console.log(value)
        setSelected(value)
    }
    return (
        <ImageBackground source={require('../../assets/bgImage.png')} style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.8)', height: heightToDp('100%') }}>
            <View style={{alignItems:'center'}}>
                    <View style={{height: heightToDp('11%'), width: widthToDp('80%'), justifyContent:'center', marginTop: heightToDp('10%'), borderRadius: 20 ,backgroundColor:'#4076E5'}}>
                        <Image source={require('../../assets/homepages.png')} style={{ height: heightToDp('10%'), width: widthToDp('80%')}} />
                    </View>
                </View>
                {/* <Image source={require('../../assets/logo_.png')} style={{ height: heightToDp('10%'), width: widthToDp('70%'), alignSelf: 'center', marginTop: heightToDp('3%') }} /> */}
                <Text style={{ color: '#74AEF4', alignSelf: 'center', marginTop: heightToDp('3%'), fontWeight: 'bold' }}>SELECT YOUR LANGUAGE</Text>
                <FlatList
                    data={LanguageSet}
                    numColumns={'2'}
                    columnWrapperStyle={{ alignSelf: 'center' }}
                    renderItem={({ item, key }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => selectFunction(item.value)}
                                style={{ backgroundColor: selected == item.value ? '#FFA12D' : '#131128', height: heightToDp('7%'), width: widthToDp('35%'), justifyContent: 'center', alignItems: 'center', margin: heightToDp('2%'), borderRadius: 20 }}>
                                {
                                    selected == item.value ? <View style={{ flexDirection: 'row' }}>
                                        <PencilIcon
                                            name='checkcircle'
                                            size={20}
                                            color={'white'}
                                        />
                                        <Text style={{ color: 'white', marginLeft: widthToDp('3%') }}>{item.language}</Text>
                                    </View> :
                                        <Text style={{ color: 'white', marginLeft: widthToDp('3%') }}>{item.language}</Text>

                                }
                            </TouchableOpacity>
                        )
                    }}
                />
                <LinearGradient
                    colors={['#4076E5', '#74AEF4']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginBottom: heightToDp('10%'), alignSelf: 'center' }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={{ height: heightToDp('5%'), width: widthToDp('50%'), borderRadius: 20, marginBottom: heightToDp('10%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>NEXT</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </ImageBackground>
    )
}