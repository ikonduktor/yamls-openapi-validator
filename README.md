# Small library for merge yml files into one JSON file

> This library was created according to requirements of separated business and may not be suitable
> for wide usage.

## Prerequisites

This project was created for better experience with package
[express-openapi-validator](https://www.npmjs.com/package/express-openapi-validator). With
yml-merge-tool lib you can use not one yml file, but many separated.

## Installation

To install and set up the library, run:

```sh
$ npm install yml-merge-tool -save
```

## Usage

```js
const ymlMergeTool = require('yml-merge-tool');
const apiSpec = ymlMergeTool.getSpec('OPENAPI_SPEC_FOLDER_PATH'));
```

#### Example with express-openapi-validator

```js
const ymlMergeTool = require('yml-merge-tool');
const OpenApiValidator = require('express-openapi-validator');
const express = require('express');

const app = express();

const apiSpec = ymlMergeTool.getSpec(path.join(process.cwd(), '/openapi'));
app.use(OpenApiValidator.middleware({ apiSpec }));
```

#### /openapi folder files examples

`headers.yml`

```yml
openapi: 3.0.3
info:
    title: Swagger Petstore - OpenAPI 3.0
    description: description
    version: 1.0.11
servers:
    - url: http://localhost:3000
```

`admin/tags.yml`

```yml
tags:
    - name: admin
```

`admin/auth.yml`

```yml
paths:
    /admin/auth/login:
        post:
            tags:
                - admin
            requestBody:
                content:
                    application/json:
                        schema:
                            $ref: '#/components/schemas/AdminLogin'
                    application/x-www-form-urlencoded:
                        schema:
                            $ref: '#/components/schemas/AdminLogin'
                required: true
            responses:
                '200':
                    description: Successful operation
components:
    schemas:
        AdminLogin:
            required:
                - email
                - password
            type: object
            properties:
                email:
                    type: string
                    format: email
                    example: user@gmail.com
                password:
                    type: string
                    minLength: 10
                    maxLength: 20
                    example: doggie
            additionalProperties: false
```

As a result we will have one JSON file with merged these 3 files;
