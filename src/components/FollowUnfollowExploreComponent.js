import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import HeartIcon from 'react-native-vector-icons/AntDesign'
import { heightToDp, widthToDp } from './Responsive'


const FollowUnfollowExploreComponent = ({ item, addFollowFunction, removeFollowFunction, userid }) => {

    const [followText, setFollowText] = useState('notSet')
    const [list, setList] = useState(item.followers)

    const removeFromListFunction = () => {
        var array = [...list]
        var index = array.findIndex(x => x == userid)
        if (index !== -1) {
            array.splice(index, 1);
            setList(array)
        }
    }
    return (
        <>
            {
                list.some(el => el == userid) ? <LinearGradient
                    colors={['#4076E5', '#74AEF4']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 200, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', marginLeft: widthToDp('0%') }}
                >
                    <TouchableOpacity
                        // onPress={() => { setFollowText('Following'); addFollowFunction(item._id) }}
                        onPress={() => [setFollowText('Follow'), removeFromListFunction(),removeFollowFunction(item._id)]}
                        style={{ height: heightToDp('4%'), width: widthToDp('25%'), borderRadius: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontSize: heightToDp('1.8%'), color: 'white' }}>{followText == 'notSet' ? 'Following' : followText}</Text>

                    </TouchableOpacity>
                </LinearGradient> : <LinearGradient
                    colors={['#4076E5', '#74AEF4']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 200, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', marginLeft: widthToDp('0%') }}
                >
                    <TouchableOpacity
                        // onPress={() => { setFollowText('Follow'); removeFollowFunction(item._id) }}
                        onPress={() => [setFollowText('Following'), setList([...list, userid],addFollowFunction(item._id))]}
                        style={{ height: heightToDp('4%'), width: widthToDp('25%'), borderRadius: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontSize: heightToDp('1.8%'), color: 'white' }}>{followText == 'notSet' ? 'Follow' : followText}</Text>

                    </TouchableOpacity>
                </LinearGradient>
            }
        </>
    )
}

export default FollowUnfollowExploreComponent