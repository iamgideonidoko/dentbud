import asyncio
import inspect
from sanic import Sanic, Blueprint, response
from sanic.request import Request
from sanic.response import HTTPResponse
from typing import Text, Dict, Any, Optional, Callable, Awaitable, NoReturn

import rasa.utils.endpoints
from rasa.core.channels.channel import (
    InputChannel,
    CollectingOutputChannel,
    UserMessage,
)

class DentbudInput(InputChannel):
    """ Dentbud input channel implementation """

    # returns the name of this channel (dentbud);
    def name(self) -> Text:
        return "dentbud"

    # blueprint for the sanic framework server
    def blueprint(
        self, on_new_message: Callable[[UserMessage], Awaitable[None]]
    ) -> Blueprint:

        dentbud_webhook = Blueprint(
            "dentbud_webhook_{}".format(type(self).__name__),
            inspect.getmodule(self).__name__,
        )

        @dentbud_webhook.route("/", methods=["GET"])
        async def health(request: Request) -> HTTPResponse:
            return response.json({
                "name": "Dentbud AI",
                "description": "AI Webhook for Dentbud, an AI-powered mobile assistant for students.",
                "status": "ok"

            })

        @dentbud_webhook.route("/webhook", methods=["POST"])
        async def receive(request: Request) -> HTTPResponse:
            sender_id = request.json.get("sender") # method to get sender_id 
            text = request.json.get("text") # method to fetch text from payload
            input_channel = self.name() # method to fetch input channel
            metadata = self.get_metadata(request) # method to get metadata

            # the default implementation for collecting output channel
            collector = CollectingOutputChannel()

            if not sender_id or not text:
                return response.json({ 
                    "status": "fail",
                    "statusCode": 401,
                    "message": "Please, enter all fields"
                 },
                 status=401);
            
            # include exception handling
            
            # send the user message to Rasa model and wait for the response to be sent back
            await on_new_message(
                UserMessage(
                    text,
                    collector,
                    sender_id,
                    input_channel=input_channel,
                    metadata=metadata,
                )
            )

            return response.json(collector.messages)

        return dentbud_webhook