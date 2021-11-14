import { google } from 'googleapis';
//import key from './chat-b920c-firebase-adminsdk-zx62e-de07cf388b.json';
import key from './chat-b920c-firebase-adminsdk-zx62e-a47a055c6e.json';
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

async function main(){
	try {
		const jwtClient = new google.auth.JWT({
			email: key.client_email,
			key: key.private_key,
			scopes: SCOPES
		});

		jwtClient.authorize((err,token)=>{
			if(err) {
				throw new Error(''+err);
			}
			console.log(JSON.stringify(token,null,2));
		});

	} catch (error) {
		console.log(error);
	}
}

main().catch(err=>console.log(err));