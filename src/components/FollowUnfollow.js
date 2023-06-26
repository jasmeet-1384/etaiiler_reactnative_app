import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import HeartIcon from 'react-native-vector-icons/AntDesign'
import { heightToDp, widthToDp } from './Responsive'


const FollowUnfollow = ({ item, addFollowFunction, removeFollowFunction, userid }) => {

    const [followText, setFollowText] = useState('notSet')
    const [list, setList] = useState(item.user_id.followers)

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
                item.user_id._id === userid ? null : list.some(el => el == userid) ? <TouchableOpacity
                    onPress={() => [setFollowText('Follow'), removeFromListFunction(), removeFollowFunction(item.user_id._id)]}
                    style={{ height: heightToDp('4%'), width: widthToDp('20%'), backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20,marginRight:widthToDp('3%') }}>
                    <Text>{followText == 'notSet' ? 'Following' : followText}</Text>
                </TouchableOpacity> : <TouchableOpacity
                    onPress={() => [setFollowText('Following'), setList([...list, userid]), addFollowFunction(item.user_id._id)]}
                    style={{ height: heightToDp('4%'), width: widthToDp('20%'), backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20,marginRight:widthToDp('3%') }}>
                    <Text>{followText == 'notSet' ? 'Follow' : followText}</Text>
                </TouchableOpacity>
            }
        </>
    )
}

export default FollowUnfollow