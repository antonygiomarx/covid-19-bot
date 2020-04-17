import { config } from "src/config/config";
import { sendMessage } from "./sendMessage";
import { setMessage } from "./setMessage";
const uri: string = config.uri,
  token: string = config.pageToken;

export const defaultMessage = async (senderId: string) => {
  await sendMessage(setMessage(senderId, "Hola"), uri, token);
};
