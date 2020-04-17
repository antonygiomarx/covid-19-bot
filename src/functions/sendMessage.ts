import axios from "axios";
import { Message } from "src/types/Message";

export const sendMessage = async (
  message: Message,
  uri: string,
  token: string
): Promise<any> => {
  try {
    await axios.post(uri, message, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
  } catch (error) {}
};
