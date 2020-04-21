import { Controller, Post, Req, Get, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { config } from '../config/config';
import { handleEvent } from '../functions/handleEvent';

const token = config.token;

@Controller('/api/webhook')
export class Webhook {
  @Get()
  async verifyGet(@Req() req: Request, @Res() res: Response) {
    if (req.query['hub.verify_token'] == token) {
      res.send(req.query['hub.challenge']).status(200);
    }
    return res.send('No tienes acceso');
  }

  @Post()
  async verifyPost(@Req() req: Request) {
    const webhookEvent = req.body.entry[0];
    if (webhookEvent) {
      if (webhookEvent.messaging) {
        webhookEvent.messaging.forEach((e: any) => {
          handleEvent(e.sender.id, e);
        });
      }
      return console.log(webhookEvent);
    }
  }
}
