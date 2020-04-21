import { Controller, Post, Req } from '@nestjs/common';
import { Response, Request, Router } from 'express';
import { config } from '../config/config';
import { handleEvent } from '../functions/handleEvent';
const router = Router();
const token = config.token;

router.get('/webhook', (req: Request, res: Response) => {
  if (req.query['hub.verify_token'] == token) {
    res.send(req.query['hub.challenge']).status(200);
  } else {
    res.send('No tienes acceso');
  }
});

export default router;
@Controller('/webhook')
export class Webhook {
  @Post()
  async verifyPost(@Req() req: Request) {
    const webhookEvent = req.body.entry[0];
    if (webhookEvent.messaging) {
      webhookEvent.messaging.forEach((event: any) => {
        handleEvent(event.sender.id, event);
      });
    }
  }
}
