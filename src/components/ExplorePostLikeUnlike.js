import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import HeartIcon from 'react-native-vector-icons/AntDesign'
import { heightToDp, widthToDp } from './Responsive'
import { useNavigation } from '@react-navigation/native';


const ExplorePostLikeUnlike = ({ item, addPostLikeFunction, removePostLikeFunction, userid }) => {
    const navigation = useNavigation();
    const [heartState, setHeartState] = useState('notSet')
    const [likes, setLikes] = useState(Number(item?.likes?.length))
    const [counter, setCounter] = useState(0)
    const [likesContents, setLikesContents] = useState(item?.likes)

    useEffect(() => {
        setLikes(item?.likes?.length)
    }, [])


    const unlikeFunction = () => {
        var array = [...likesContents]
        var index = array.findIndex(x => x.likedBy === userid)
        if (index !== -1) {
            array.splice(index, 1);
            setLikesContents(array)
        }
    }

    return (
        <View style={{ flexDirection: 'row',justifyContent:'space-between',padding:heightToDp(0.5) }}>
            {/* <View style={{width:widthToDp(20),height:heightToDp(5),backgroundColor:'#fff',elevation:widthToDp(5),alignItems:'center',justifyContent:'center'}}> */}
                <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center',elevation:widthToDp(4) }}
                    onPress={() => navigation.navigate('LikeListScreen', { postId: item?._id })}
                    // onPress={() => console.log(likesContents)}
                >
                    <Text style={{ color: 'white' }}>{likes} Likes</Text>
                </TouchableOpacity>
            {/* </View> */}
            {/* <View style={{width:widthToDp(8),height:heightToDp(3.7),backgroundColor:'#fff',borderRadius:widthToDp(4),elevation:widthToDp(4),alignItems:'center',justifyContent:'center'}}> */}
                <View
                    style={{ justifyContent: 'center',elevation:widthToDp(9) }}
                >
                    {
                        likesContents?.some(el => el.likedBy === userid) ? <HeartIcon
                            name={heartState === "notSet" ? 'heart' : heartState}
                            size={22}
                            color={'red'}
                            onPress={() => { setHeartState('hearto'); removePostLikeFunction(item?._id); setLikes(Number(likes) - 1),unlikeFunction() }}
                        /> : <HeartIcon
                            name={heartState === "notSet" ? 'hearto' : heartState}
                            size={22}
                            color={'white'}
                            onPress={() => { setHeartState('heart'); addPostLikeFunction(item?._id); setLikes(Number(likes) + 1); setLikesContents([...likesContents, { likedBy: userid }]) }}
                        // onPress = {() => setLikesContents([...likesContents,{likedBy: userid}])}
                        />
                    }
                </View>
            {/* </View> */}
        </View>
    )
}

export default ExplorePostLikeUnlike