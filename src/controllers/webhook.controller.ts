import {
  Controller, Post, Req, Get, Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { config } from '../config/config';
import { handleEvent } from '../functions/handleEvent';

@Controller('/webhook')
export class WebhookController {
  @Get()
  getRoute(@Req() req: Request, @Res() res: Response) {
    req.query['hub.verify_token'] == config.token
      ? res.send(req.query['hub.challenge']).status(200)
      : res.send('No tienes acceso').status(403);
  }

  @Post()
  verifyPost(@Req() req: Request) {
    const webhookEvent = req.body.entry[0];
    if (webhookEvent) {
      if (webhookEvent.messaging) {
        webhookEvent.messaging.forEach((e: any) => {
          handleEvent(e.sender.id, e);
        });
        return;
      }
      return console.log(webhookEvent);
    }
  }
}
