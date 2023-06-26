import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import HeartIcon from 'react-native-vector-icons/AntDesign'
import { getPostSharesUrl } from '../api/apiConstant'
import { heightToDp, widthToDp } from './Responsive'

const SharedNameAndOthers = ({ postDetails }) => {
    const [followArr, setFollowArr] = useState([])

    const getPostSharesFunction = async () => {
        try {
            let postId = postDetails
            var data = {
                postId: postId
            }
            var response = await fetch(getPostSharesUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            setFollowArr(responseJson.data)
            // console.log(responseJson.data, "<...............fffffffffffffffff")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }

    useEffect(() => {
        async function calculate() {
            await getPostSharesFunction()
        }
        calculate()
    }, [])
    // console.log(followArr.length, "]]]]]]]]]]]]]]]]]]]]]")
    return (
        <View style={{ flexDirection: 'row' }}>
            {
                followArr.length > 1 ? <>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>{followArr[0] == undefined ? "" : followArr[0].user_id.name} </Text>
                    <Text style={{ color: 'black' }}>+ {followArr.length - 1} others shared this post</Text>
                </> : <>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>{followArr[0] == undefined ? "" : followArr[0].user_id.name} </Text>
                    <Text style={{ color: 'black' }}>shared this post</Text>

                </>
            }
        </View>
    )
}

export default SharedNameAndOthers