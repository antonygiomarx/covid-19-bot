import { Message } from "src/types/Message";

export const setMessage = (senderId: string, message: Message) => {
  message = {
    recipient: {
      id: senderId
    },
    message: {
      text: message
    }
  };

  return JSON.stringify(message);
};
