import { config } from 'src/config/config';
import { command } from './command';
import { sendMessage } from './sendMessage';
import { setMessage } from './setMessage';

const { uri, pageToken } = config;

export const handleMessage = async (senderId: string, message: string) => {
  message = message.trim().toLowerCase();

  if (message.includes('!countries')) {
    if (message.includes('all')) {
      command.countries(senderId, true);
    } else {
      command.countries(senderId);
    }
  } else if (message.includes('!country')) {
    command.country(senderId, message);
  } else if (message.includes('!help')) {
    sendMessage(
      setMessage(
        senderId,
        `Los comandos disponibles para el bot actualmente son:
          \n"!countries" : Muestra el total de países donde actualmente está afectando el virus.
          \n"!country [país]" : Muestra los datos del país solicitado.`,
      ),
      uri,
      pageToken,
    );
  } else {
    sendMessage(
      setMessage(
        senderId,
        'Hola, bienvenido al bot Covid-19, para más información escribe "!help"',
      ),
      uri,
      pageToken,
    );
  }
};
