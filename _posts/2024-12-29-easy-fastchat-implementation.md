---
regenerate: true
layout: post
title: "Deploying an OpenAI Compatible Endpoint using FastChat"
date: 2024-12-29
pretty_table: true
tags: llms fastchat
toc:
  beginning: true
---

As a developer exploring open-source LLM tooling, I used FastChat to deploy an OpenAI-compatible endpoint. Below I explain the components, the deployment steps I followed, and sample requests/responses so you can reproduce the setup.

# Components Overview

FastChat's architecture has three main pieces I relied on:

- **Controller**: Manages the Model Worker and handles incoming requests.
- **Model Worker**: Loads the model and generates responses based on user input.
- **OpenAI compatible API Server**: Handles client requests, forwards them to the Model Worker, and returns responses.

# Deployment Steps

To reproduce my environment I installed FastChat and started the three components. Minimal installation:

```bash
pip install fastchat
```

2.  Start the Controller, Model Worker, and OpenAI compatible API Server:

```bash
python -m fastchat.serve.controller \
  --host 127.0.0.1 &
python -m fastchat.serve.model_worker \
  --host 127.0.0.1 \
  --controller-address http://127.0.0.1:21001 \
  --model-path /path/to/model &
python -m fastchat.serve.openai_api_server \
--host 127.0.0.1 \
--controller-address http://127.0.0.1:21001 \
--port 8000
```

Make sure to replace `/path/to/model` with the actual path to your model file and set the same `controller-address` argument for both `model_worker` and `openai_api_server`.

**Client Requests and Response**

Request file `request.json` has the following structure:

```json
{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "What is deep learning?" }
  ],
  "max_tokens": 100
}
```

Once the components are running, you can send requests to the OpenAI compatible API Server using a client of your choice (e.g., cURL):

```bash
curl -X POST \
  http://127.0.0.1:8000/ \
  -H 'Content-Type: application/json' \
  -d @request.json
```

And the OpenAI compatible API server will return a response similar to the following:

```json
{
  "id": "1",
  "object": "chat.completion",
  "created": 1734702969.6255138,
  "model": "/path/to/model",
  "choices": [
    {
      "message": { "role": "assistant", "content": "Deep learning is a subset of machine learning..." },
      "finish_reason": "stop",
      "index": 0
    }
  ]
}
```

# Benefits

This approach offers several benefits, including:

- **Efficient Deployment**: FastChat provides a reliable framework for deploying language models, allowing developers to concentrate on other project aspects.
- **Scalability**: This architecture enables great scalability and flexibility by allowing the execution of multiple models concurrently on different ports.
- **Reliability**: By separating concerns into distinct components, the system ensures reliability and reduces single-point failures.
- **Accessibility**: As it is based on established open-source frameworks, there is ample documentation and resources available to learn and improve this framework. The API documentation for this deployment can also be accessed at `http://127.0.0.1:8000/docs`, assisting both users and third-party developers on how to use the tool and how to develop new products.

By following these steps, you can deploy an OpenAI compatible Endpoint using FastChat, providing a robust and efficient solution for your language modeling needs.
