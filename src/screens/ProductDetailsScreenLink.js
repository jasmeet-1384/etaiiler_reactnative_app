import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, ToastAndroid, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import Header from '../components/Header'
import HeartIcon from 'react-native-vector-icons/AntDesign'
import ShareIcon from 'react-native-vector-icons/AntDesign'
import DotIcon from 'react-native-vector-icons/Entypo'
import LocationIcon from 'react-native-vector-icons/Entypo'
import ChatIcon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native';
import { addPostLikeApiCall } from '../store/addPostLike-slice'
import { removePostLikeApiCall } from '../store/removePostLike-slice'
import { addCommentApiCall } from '../store/addComment-slice'
import { getCommentApiCall } from '../store/getComment-slice'
import { useDispatch, useSelector } from 'react-redux'
import SendIcon from 'react-native-vector-icons/Feather'
import { getCommentUrl, sharePostsUrl } from '../api/apiConstant'
import PostLikeUnlike from '../components/PostLikeUnlike'
import SharedNameAndOthers from '../components/SharedNameAndOthers'
import PostShare from '../components/PostShare'
import ReadMore from '@fawazahmed/react-native-read-more'
import HomeScreenDistanceComponent from '../components/HomeScreenDistanceComponent'
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import { RadioButton } from 'react-native-paper'
import ReportIcon from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'


export default ProductDetailsScreenLink = ({ route, navigation }) => {
    return(
        <View></View>
    )
}