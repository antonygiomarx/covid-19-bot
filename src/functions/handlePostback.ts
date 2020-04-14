import { defaultMessage } from './defaultMessage';
import { sendMessage } from './sendMessage';
import { messages } from 'src/config/messages';
import { config } from 'src/config/config';
import { setMessage } from './setMessage';

const { info, info2 } = messages;
const { uri, pageToken } = config;
//Se reciben los postback
export const handlePostback = async (
  senderId: string,
  payload: any
): Promise<any> => {
  switch (payload) {
    //Al recibir Get Started
    case 'GET_STARTED_COVID-19-BOT':
      console.log(payload);
      sendMessage(
        setMessage(
          senderId,
          'Hola, bienvenido al bot Covid-19, para más información escribe "!help"'
        ),
        uri,
        pageToken
      );
      break;
    case 'BOT_INFO':
      await sendMessage(setMessage(senderId, info), uri, pageToken);
      await sendMessage(setMessage(senderId, info2), uri, pageToken);
      break;
    case 'BOT_COUNTRIES':
      break;
    default:
      defaultMessage(senderId);
  }
};
