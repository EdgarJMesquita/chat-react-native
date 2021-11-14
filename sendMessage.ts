import axios from 'axios';
import token from './token.json';

const PROJECT_ID = 'chat-b920c';
const HOST = 'https://fcm.googleapis.com';
const PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';

const device_token = 'ePG1JQCDSWuyYjBfUUJU01:APA91bELL--nFpH7AzEb7TjPbHUyy_h7NNF2rM57-5kZcRHUGGizsFeC9Oc7b39VgYx7C092gWmIbJKDHLXuWxEk_Df9nyzmMyvMyTkaUkvQaa6Zxs-moR7i0mtwL0fGEMfEuxOM9Re5';

type Message = {
	message: {
		token: string;
		notification: {
			title: string;
			body: string;
		},
		data?:{
			[key:string]: string;
		}
	}
}

async function main() {
	try {
		const headers = {
			Authorization: `Bearer ${token.access_token}`
		}

		const body = {
			message: {
				token: device_token,
				notification: {
					title: "Bora Cairo",
					body: "Finalmente deu certo, precisa usar Bearer token deles, autenticação pela 'key=' ficou legado."
				}
			}
		}

		const { data } = await axios.post(HOST+PATH, body,{
			headers
		});

		console.log(data);

	} catch (error:any) {
		throw new Error(error.response.status);
	}
}
main().catch(err=>console.log(err));