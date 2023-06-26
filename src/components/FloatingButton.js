import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, Image } from 'react-native'
import { heightToDp, widthToDp } from './Responsive'
import PlusIcon from 'react-native-vector-icons/AntDesign'
import UploadIcon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'
import ImagePicker from 'react-native-image-crop-picker';

export default FloatingButton = ({ userRole }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    //upload post function
    const uploadPostFunction = (value) => {
        ImagePicker.openPicker({
            width: 1500,
            height: 1700,
            cropping: true,
            compressImageMaxHeight: 1700,
            compressImageMaxWidth: 1500,
            compressImageQuality: 1
        }).then(image => {
            console.log(image);
            if (value == 'product') {
                navigation.navigate('AddPostScreen', { imageDetails: image, postType: 'product' })
            } else if (value == 'promo') {
                navigation.navigate('AddPromoScreen', { imageDetails: image, postType: 'promo' })
            }
            else {
                navigation.navigate('AddPostScreen', { imageDetails: image, postType: 'post' })
            }
        });
        setModalVisible(false)
    }
    return (
        <>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{ backgroundColor: '#131127', height: heightToDp('7%'), width: widthToDp('14%'), position: 'absolute', bottom: 10, right: 10, borderRadius: 200, elevation: 10, justifyContent: 'center', alignItems: 'center' }}>
                <PlusIcon
                    name='plus'
                    size={30}
                    color={'white'}
                />
            </TouchableOpacity>
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
                        <View style={{ backgroundColor: 'white', height: userRole == 'user' ? heightToDp('12%') : heightToDp('24%'), width: widthToDp('100%'), bottom: 0, position: 'absolute', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <View style={{ width: widthToDp('85%'), alignSelf: 'center', marginTop: heightToDp('4%') }}>
                                {
                                    userRole == 'user' ? null : <TouchableOpacity
                                        onPress={() => uploadPostFunction("promo")}
                                        style={{ flexDirection: 'row', height: heightToDp('3%'), alignItems: 'center',marginBottom: heightToDp('4%') }}>
                                        <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                            <UploadIcon
                                                name='upload'
                                                size={20}
                                                color={'black'}
                                            />
                                        </View>
                                        <Text style={{ color: 'gray', marginLeft: widthToDp('2%') }}>Promote Business</Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity
                                    onPress={() => uploadPostFunction("post")}
                                    style={{ flexDirection: 'row', height: heightToDp('3%'), alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <UploadIcon
                                            name='upload'
                                            size={20}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%') }}>Add Post</Text>
                                </TouchableOpacity>
                                {
                                    userRole == 'user' ? null : <TouchableOpacity
                                        onPress={() => uploadPostFunction("product")}
                                        style={{ flexDirection: 'row', height: heightToDp('3%'), alignItems: 'center', marginTop: heightToDp('4%') }}>
                                        <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                            <UploadIcon
                                                name='upload'
                                                size={20}
                                                color={'black'}
                                            />
                                        </View>
                                        <Text style={{ color: 'gray', marginLeft: widthToDp('2%') }}>Upload Product Photo</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>

                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </>
    )
}