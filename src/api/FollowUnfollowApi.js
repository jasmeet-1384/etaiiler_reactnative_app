import { followUrl, unfollowUrl, getfollowUrl } from './apiConstant'

export const followFetch = async (followId, user_id , role) => {
    try {
        var data = {
            followId: followId,
            user_id: user_id,
            role : role
        }

        var response = await fetch(followUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== Follow user")
    }
}

export const unfollowFetch = async (followId, user_id) => {
    try {
        var data = {
            followId: followId,
            user_id: user_id
        }

        var response = await fetch(unfollowUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== unFollow user")
    }
}

export const getfollowFetch = async (whoIsFollowing) => {
    try {
        var data = {
            whoIsFollowing: whoIsFollowing
        }

        var response = await fetch(getfollowUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== get Follow user")
    }
}