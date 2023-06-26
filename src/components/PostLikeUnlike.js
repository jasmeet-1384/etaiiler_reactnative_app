// import React, { useEffect, useState } from 'react'
// import { Text, TouchableOpacity, View } from 'react-native'
// import HeartIcon from 'react-native-vector-icons/AntDesign'
// import { heightToDp, widthToDp } from './Responsive'
// import { useNavigation } from '@react-navigation/native';


// const PostLikeUnlike = ({ item, addPostLikeFunction, removePostLikeFunction, userid }) => {
//     const navigation = useNavigation();
//     const [heartState, setHeartState] = useState('notSet')
//     const [likes, setLikes] = useState(0)
//     const [counter, setCounter] = useState(0)
//     const [item_state,setitem_state]=useState(item.likes)

//     useEffect(() => {
//         setLikes(item_state.length)
//     }, [item_state])

//     return (
//         item_state.length>=0?
//         <View style={{ flexDirection: 'row' }}>
//             <View
//                 style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}
//             >
//                 {
//                     item_state?.some(el => el.likedBy === userid) ? <HeartIcon
//                         name={heartState === "notSet" ? 'heart' : heartState}
//                         size={20}
//                         color={'red'}
//                         onPress={() => { setHeartState('hearto'); removePostLikeFunction(item_state._id); setLikes(item_state.length) }}
//                     /> : <HeartIcon
//                         name={heartState === "notSet" ? 'hearto' : heartState}
//                         size={20}
//                         color={'red'}
//                         onPress={() => { setHeartState('heart'); addPostLikeFunction(item_state._id);setitem_state([...item_state,{likedBy:userid}]) ;setLikes(Number(likes) + 1) ; setCounter(counter + 1) }}
//                     /> 
//                 }
//             </View>
//             <TouchableOpacity
//                 style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}
//                 onPress={() => navigation.navigate('LikeListScreen', { postId: item_state._id })}
//             >
//                 <Text style={{ color: 'gray' }}>{likes}</Text>
//             </TouchableOpacity>
//         </View>:<></>
//     )
// }

// export default PostLikeUnlike


import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import HeartIcon from 'react-native-vector-icons/AntDesign'
import { heightToDp, widthToDp } from './Responsive'
import { useNavigation } from '@react-navigation/native';


const PostLikeUnlike = ({ item, addPostLikeFunction, removePostLikeFunction, userid }) => {
    const navigation = useNavigation();
    const [heartState, setHeartState] = useState('notSet')
    const [likes, setLikes] = useState(Number(item?.likes?.length))
    const [counter, setCounter] = useState(0)
    const [likesContents, setLikesContents] = useState(item.likes)

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
        <View style={{ flexDirection: 'row' }}>
            <View
                style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}
            >
                {
                    likesContents.some(el => el.likedBy === userid) ? <HeartIcon
                        name={heartState === "notSet" ? 'heart' : heartState}
                        size={20}
                        color={'red'}
                        onPress={() => { setHeartState('hearto'); removePostLikeFunction(item?._id); setLikes(Number(likes) - 1),unlikeFunction() }}
                    /> : <HeartIcon
                        name={heartState === "notSet" ? 'hearto' : heartState}
                        size={20}
                        color={'red'}
                        onPress={() => { setHeartState('heart'); addPostLikeFunction(item?._id); setLikes(Number(likes) + 1); setLikesContents([...likesContents, { likedBy: userid }]) }}
                    // onPress = {() => setLikesContents([...likesContents,{likedBy: userid}])}
                    />
                }
            </View>
            <TouchableOpacity
                style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}
                onPress={() => navigation.navigate('LikeListScreen', { postId: item?._id })}
                // onPress={() => console.log(likesContents)}
            >
                <Text style={{ color: 'gray' }}>{likes}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PostLikeUnlike