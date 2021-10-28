import { MessageProps } from "../components/MessagesList";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export async function saveAssetAndReturnURI(msg:MessageProps) {
  const base64 = msg.image?.base64 || '';
  const ext = msg.image?.ext || '';
  // Handling permissions
  const {status} = await MediaLibrary.getPermissionsAsync();
  status==='denied' && await MediaLibrary.requestPermissionsAsync();
  // Save asset to library
  const fileName = `${FileSystem.cacheDirectory+msg.id}.${ext}`;
  const encoding = FileSystem.EncodingType.Base64;
  await FileSystem.writeAsStringAsync(fileName, base64, { encoding });
  const { uri } = await MediaLibrary.createAssetAsync(fileName);

  return {
    id: msg.id,
    date: msg.date,
    sender: msg.sender,
    text: msg.text,
    uri
  }
}