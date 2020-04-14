import { Controller, Post, Get, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { config } from '../config/config';
import { handleEvent } from '../functions/handleEvent';

@Controller('webhook')
export class Webhook {
  @Get()
  async verifyGet(@Req() req: Request, @Res() res: Response) {
    if (req.query['hub.verify_token'] == config.token) {
      res.send(req.query['hub.challenge']).status(200);
    } else {
      res.send('No tienes acceso').status(401);
    }
  }

  @Post()
  async verifyPost(@Req() req: Request, @Res() res: Response) {
    const webhookEvent = req.body.entry[0];
    if (webhookEvent.messaging) {
      webhookEvent.messaging.forEach((event: any) => {
        handleEvent(event.sender.id, event);
      });
    }
    res.send('Prueba post exitosa');
  }
}
