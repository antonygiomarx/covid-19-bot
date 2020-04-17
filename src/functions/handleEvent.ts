import { handlePostback } from "./handlePostback";
import { handleMessage } from "./handleMessage";

export const handleEvent = async (
  senderId: string,
  event: any
): Promise<any> => {
  if (event.message) {
    const message = event.message.text;
    handleMessage(senderId, message);
  } else if (event.postback) {
    const payload = event.postback.payload;
    handlePostback(senderId, payload);
    console.log(payload);
  }
};
