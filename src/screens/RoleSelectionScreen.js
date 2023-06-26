import React, { useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import LinearGradient from 'react-native-linear-gradient'

export default RoleSelectionScreen = ({ navigation }) => {

    const [value, setValue] = useState('')

    var radio_props = [
        { label: 'BUSINESS PROFILE', value: 0 },
        { label: 'USER PROFILE', value: 1 }
    ];

    const navigationFunction = (value) => {
        if(value == 0){
            navigation.navigate('BusinessFormScreen')
        }else if(value == 1){
            navigation.navigate('UserFormScreen')
        }
    }
    return (
        <ImageBackground source={require('../../assets/bgImage.png')} style={{ flex: 1 }}>

            <View style={{ backgroundColor: 'rgba(255,255,255,0.8)', height: heightToDp('100%') }}>
                <Image
                    source={require('../../assets/blackTop.png')}
                    style={{ height: heightToDp('13%'), width: widthToDp('54%') }}
                />
                                <View style={{alignItems:'center'}}>
                    <View style={{height: heightToDp('11%'), width: widthToDp('80%'), justifyContent:'center', marginTop: heightToDp('10%'), borderRadius: 20 ,backgroundColor:'#4076E5'}}>
                        <Image source={require('../../assets/homepages.png')} style={{ height: heightToDp('10%'), width: widthToDp('80%')}} />
                    </View>
                </View>
                {/* <Image source={require('../../assets/logo_.png')} style={{ height: heightToDp('10%'), width: widthToDp('80%'), alignSelf: 'center', marginTop: heightToDp('10%'),borderRadius:20 }} /> */}
                <View style={{ alignItems: 'center', marginTop: heightToDp('5%') }}>
                    <RadioForm
                        animation={true}
                    >

                        {
                            radio_props.map((obj, i) => (
                                <RadioButton labelHorizontal={true} key={i} style={{ marginTop: heightToDp('5%') }} >
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        //isSelected = {setValue(value === i)}
                                        isSelected={value === i}
                                        onPress={(value) => { setValue(value) }}
                                        borderWidth={1}
                                        buttonInnerColor={'#4076E5'}
                                        buttonOuterColor={'black'}
                                        //buttonOuterColor={setValue(value === i) ? '#2196f3' : '#000'}
                                        buttonSize={heightToDp('2%')}
                                        buttonOuterSize={heightToDp('3%')}
                                        buttonStyle={{ marginRight: widthToDp('5%') }}
                                        buttonWrapStyle={{ marginLeft: widthToDp('00%') }}
                                    />
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={(value) => { setValue(value) }}
                                        //onPress={onPress}
                                        labelStyle={{ fontSize: 20, color: '#201E6E' }}
                                        labelWrapStyle={{}}
                                    />
                                </RadioButton>
                            ))
                        }
                    </RadioForm>
                </View>
                <LinearGradient
                    colors={['#4076E5', '#74AEF4']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('10%'), alignSelf: 'center' }}
                >
                    <TouchableOpacity
                        onPress={() => navigationFunction(value)}
                        style={{ height: heightToDp('5%'), width: widthToDp('50%'), borderRadius: 20, marginBottom: heightToDp('10%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>NEXT</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <Image
                    source={require('../../assets/blackBottom.png')}
                    style={{ height: heightToDp('13%'), width: widthToDp('60%'), bottom: 0, position: 'absolute', alignSelf: 'flex-end' }}
                />
            </View>
        </ImageBackground>
    )
}