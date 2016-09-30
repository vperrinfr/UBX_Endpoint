# UBX Endpoint using Node.js

This repository will be the starting place to design an UBX endpoint.
Universal Behavior Exchange [UBX](https://www.ibm.com/commerce/us-en/universal-behavior-exchange/)

[![Deploy in Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy# [required])

## Collaborating

One of the most effective ways to collaborate on GitHub is by using a forking/branching model as described in the [GitHub Guides](https://guides.github.com/).

## Current features

Retrieve all UBX events sent to that endpoint

## Code Roadmap

- [ ] Adding the ability to create the endpoint
- [ ] provide a skeleton to push received event to another system
- [ ] Improve User Interface

## Endpoint creation in UBX

First you have to deploy your app

1. Log in into [UBX](https://ubx-01.ibmmarketingcloud.com/)
2. On the Endpoints tab, click Register new endpoint to display the endpoint registration wizard.
3. Select the custom endpoint and click Next.
4. Copy the authentication key
5. Use a REST client like [Postman](https://www.getpostman.com/) or [Curl](https://curl.haxx.se/)
6. Do a REST Call
  * Method: PUT
  * URL: https://api-01.ubx.ibmmarketingcloud.com/v1/endpoint
  * Headers:
    * Content-type: application/json;charset=utf-8
    * Authorization: Bearer _Endpoint authorization code step 4_
  * Body:

  {
    "name": "NodeJS",
    "description": "UBX Event to Node.js App",
    "providerName": "IBM",
    "url": "**YOUR URL**",
    "hashAlgorithm": "NONE",
    "endpointTypes": {
      "event": {
        "source": {
          "enabled": false
        },
        "destination": {
          "enabled": true,
          "url": "http://**YOUR URL**/subscriber",
          "destinationType": "push"
        }
      }
    }
  }
 7. GO back to UBX, and specify which events you want to send to that new endpoint.
 8. Open a browser and go to your URL, you will have an interface to see all received events.
