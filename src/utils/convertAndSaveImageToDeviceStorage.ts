import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

async function convertAndSaveImageToDeviceStorage(base64:string, ext:string){
  const {status} = await MediaLibrary.getPermissionsAsync();
    if(status==='denied'){
      await MediaLibrary.requestPermissionsAsync();
    }
  const fileName = FileSystem.cacheDirectory+Date.now().toString()+'.'+ext;
  await FileSystem.writeAsStringAsync(fileName,base64, {
    encoding: FileSystem.EncodingType.Base64
  });
  MediaLibrary.createAssetAsync(fileName).then(res=>console.log(res));
}