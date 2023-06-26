import {uploadImageToDBUrl} from './apiConstant'

export const uploadImageToDBFetch = async (user_id, image, description,role,tagged_id,postType, hash) => {
    try {
        var data = {
            user_id: user_id,
            image: image,
            description: description,
            role : role,
            tagged_id : tagged_id,
            postType : postType,
            hashTags: hash
        }

        var response = await fetch(uploadImageToDBUrl,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== upload picture")
    }
}