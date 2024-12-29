---
title: 'Deploying an OpenAI Compatible Endpoint using FastChat'
date: 2024-12-29
permalink: /posts/2024/12/easy-fastchat/
tags:
  - LLMs
---

{% include toc %}

[FastChat](https://github.com/lm-sys/FastChat) is a Python-based framework that enables developers to create scalable and reliable language models. In this article, we will explore how to deploy an OpenAI-compatible endpoint using FastChat by leveraging FastAPI, HuggingFace Transformers, and the [OpenAI API](https://platform.openai.com/docs/api-reference/introduction).

# Components Overview

The FastChat architecture consists of three primary components: Controller, Model Worker, and OpenAI API Server. Each component plays a crucial role in ensuring seamless communication and response generation.

*   **Controller**: Responsible for managing the Model Worker and handling incoming requests.
*   **Model Worker**: Loads the model and generates responses based on user input.
*   **OpenAI API Server**: Handles client requests, forwards them to the Model Worker, and returns responses.

# Deployment Steps

To deploy an OpenAI-compatible endpoint using FastChat, follow these steps:

1.  Install the required packages:
```bash
pip install fastchat
```

2.  Start the Controller, Model Worker, and OpenAI API Server:
```
python -m fastchat.serve.controller --host 127.0.0.1 &
python -m fastchat.serve.model_worker --host 127.0.0.1 --controller-address http://127.0.0.1:21001 --model-path /path/to/model &
python -m fastchat.serve.openai_api_server --host 127.0.0.1 --controller-address http://127.0.0.1:21001 --port 8000
```
Make sure to replace `/path/to/model` with the actual path to your model file and set the same `controller-address` argument for both `model_worker` and `openai_api_server`.

**Client Requests and Response**

Once the components are running, you can send requests to the OpenAI API Server using a client of your choice (e.g., cURL):

```bash
curl -X POST \
  http://127.0.0.1:8000/ \
  -H 'Content-Type: application/json' \
  -d @request.json
```

```json
// ** request.json **
{
    "messages": [
      { "role": "system", "content": "You are a helpful assistant." },
      { "role": "user", "content": "What is deep learning?" }
    ],
    "stream": true,
    "max_tokens": 100
}
```

**Benefits**

This approach offers several benefits, including:

*   **Efficient deployment**: FastChat provides a tested and reliable framework for deploying language models, allowing developers to focus on other aspects of their project.
*   **Scalability**: The architecture supports multiple models running concurrently, enabling different ports for each model invoked.
*   **Reliability**: By separating concerns into distinct components, the system ensures reliability and reduces single-point failures.
*   **Accessibility**: As it is based on established open-source frameworks, there is ample documentation and resources available to learn and improve this framework. The API documentation can be accessed at http://127.0.0.1:8000/docs, making it easily accessible to both third-party developers and users.

By following these steps, you can deploy an OpenAI-compatible endpoint using FastChat, providing a robust and efficient solution for your language modeling needs.