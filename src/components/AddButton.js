import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback,Image } from 'react-native'
import { heightToDp, widthToDp } from './Responsive'
import PlusIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import UploadIcon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

export default AddButton = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    //upload post function
    const uploadPostFunction = () => {
        ImagePicker.openPicker({
            width: 1200,
            height: 1500,
            cropping: true,
            compressImageMaxHeight: 1500,
            compressImageMaxWidth:1200,
            compressImageQuality:1
        }).then(image => {
            console.log(image);
            navigation.navigate('AddPostScreen',{imageDetails: image})
        });
        setModalVisible(false)
    }
    return (
        <>
            {/* <View style={{ justifyContent: 'center', width: widthToDp('10%'), alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{ width: widthToDp('10%') }}>
                    <PlusIcon
                        name='pluscircleo'
                        size={30}
                        color={'black'}
                    />
                </TouchableOpacity>
            </View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <TouchableWithoutFeedback >
                        <View style={{ backgroundColor: 'white', height: heightToDp('24%'), width: widthToDp('100%'), bottom: 0, position: 'absolute', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <View style={{ width: widthToDp('85%'), alignSelf: 'center', marginTop: heightToDp('4%') }}>
                                <TouchableOpacity style={{ flexDirection: 'row', height: heightToDp('2%'), alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <UploadIcon
                                            name='upload'
                                            size={20}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%') }}>Promote Business</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={() => uploadPostFunction()}
                                style={{ flexDirection: 'row', height: heightToDp('2%'), alignItems: 'center', marginTop: heightToDp('4%') }}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <UploadIcon
                                            name='upload'
                                            size={20}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%') }}>Add Post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', height: heightToDp('2%'), alignItems: 'center', marginTop: heightToDp('4%') }}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <UploadIcon
                                            name='upload'
                                            size={20}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%') }}>Upload Product Photo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal> */}
            <View style={{ justifyContent: 'center', width: widthToDp('10%'), alignItems: 'center' }}>
                {/* <Image
                source={require('../../assets/infinity.png')}
                /> */}
                <PlusIcon
                name='infinity'
                color={'gray'}
                size={35}
                onPress={() => alert("wassssssssssssup")}
                />
            </View>
        </>
    )
}