import { Message } from 'src/types/Types';

export const setMessage = (senderId: string, message: Message) => {
  message = {
    recipient: {
      id: senderId,
    },
    message: {
      text: message,
    },
  };

  return JSON.stringify(message);
};
