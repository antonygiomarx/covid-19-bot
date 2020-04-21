import { Controller, Post, Req, Get, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { config } from '../config/config';
import { handleEvent } from '../functions/handleEvent';

@Controller('/webhook')
export class WebhookController {
  @Get()
  async getRoute(@Req() req: Request, @Res() res: Response) {
    // Your verify token. Should be a random string.
    const VERIFY_TOKEN = config.token;

    // Parse the query params
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
    // if (req.query['hub.verify_token'] == token) {
    //   res.send(req.query['hub.challenge']).status(200);
    // }
    // return res.send('No tienes acceso').status(403);
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
