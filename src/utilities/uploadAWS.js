import { RNS3 } from 'react-native-aws3';
import {ToastAndroid} from 'react-native'

export const uploadImageToS3 = async (file, type) => {
    const fileData = {
        uri: file,
        name: `${type}-${Date.now()}`,
        type: 'image/jpeg'
    }
    const options = {
        bucket: 'etaiiler-image-upload',
        region: 'ap-south-1',
        accessKey: 'AKIATPAILJSQ3KSDD3P4',
        secretKey: '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',
        successActionStatus: 201
    }

    const imageUploadRes = await RNS3.put(fileData, options)
    console.log("tttttt => ", imageUploadRes)
    if (imageUploadRes.status == 201) {
        console.log(imageUploadRes.body.postResponse.location)
        console.log("response status === > ", imageUploadRes.status)
        // imageUploadDBFunction()
        // getUserRegistrationApiFunction(imageUploadRes.headers.Location)
        return imageUploadRes.body.postResponse.location
        
    } else {
        ToastAndroid.show("Image Unable to be uploaded")
    }
}