import React from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import PlusIcon from 'react-native-vector-icons/AntDesign'

export default UploadPhotoScreen = () => {
    return (
        <ImageBackground source={require('../../assets/bgImage.png')} style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.8)', height: heightToDp('100%'), justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: heightToDp('60%'), width: widthToDp('90%'), alignItems: 'center' }}>
                    <Text style={{ color: '#201E6E' }}>UPLOAD PROFILE</Text>
                    <Text style={{ color: '#201E6E' }}>PHOTO</Text>
                    <View style={{ height: heightToDp('10%'), width: widthToDp('20'), borderWidth: 1, borderRadius: 20, marginTop: heightToDp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                        <PlusIcon
                            name='plus'
                            size={20}
                            color={'black'}
                        />
                    </View>
                    <Text style={{ color: '#201E6E', marginTop: heightToDp('3%') }}>UPLOAD PROFILE</Text>
                    <Text style={{ color: '#201E6E' }}>PHOTO</Text>
                    <View style={{ flexDirection: 'row',justifyContent:'space-evenly',width: widthToDp('90%') }}>
                        <View style={{ height: heightToDp('10%'), width: widthToDp('20'), borderWidth: 1, borderRadius: 20, marginTop: heightToDp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                            <PlusIcon
                                name='plus'
                                size={20}
                                color={'black'}
                            />
                        </View>
                        <View style={{ height: heightToDp('10%'), width: widthToDp('20'), borderWidth: 1, borderRadius: 20, marginTop: heightToDp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                            <PlusIcon
                                name='plus'
                                size={20}
                                color={'black'}
                            />
                        </View>
                        <View style={{ height: heightToDp('10%'), width: widthToDp('20'), borderWidth: 1, borderRadius: 20, marginTop: heightToDp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                            <PlusIcon
                                name='plus'
                                size={20}
                                color={'black'}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={{ height: heightToDp('5%'), width: widthToDp('60%'), backgroundColor: 'rgba(116,174,244,0.9)', borderRadius: 20, marginTop:heightToDp('5%'), alignItems: 'center', justifyContent: 'center',alignSelf:'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>NEXT</Text>
                </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    )
}