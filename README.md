# Task List - Mobile 📝

## Description

This is a Task List web app to manage the tasks and related notes. The database is hosted at MongoDB Atlas. There is a mobile version for the app built in React Native - the repo for the Mobile App is [mkchahal/bb_RN_taskList](https://github.com/mkchahal/bb_RN_taskList).

## Demo

## Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Installation

Clone source code locally:

```
$ git clone git@github.com:mkchahal/bb_taskList.git
```

Install dependencies:

```
$ npm install
$ cd ../frontend
$ npm install
```

Set up env variables in the .env file.:

```
PORT = 4000
MONGODB_URI = 'your mongoDB uri'
```

Start running the client and the server:

```
$ npm start
$ cd ../
$ npm start
```

The client will be running at port 3000 and the server will be running at port 4000.
_Note: If you are running the server at different port, please make sure to update the proxy in the package.json file in the frontend folder._

## API Routes

### GET /task

- to get an array of all the tasks
- response body example
  ```json
  [
    {
      "_id": "631565cb5d99fd6551772bd0",
      "title": "Do Laundry",
      "content": "Do laundry on Sunday morning.",
      "createdAt": "2022-09-05T02:58:19.324Z",
      "updatedAt": "2022-09-05T08:32:54.463Z",
      "__v": 0
    },
    {
      "_id": "631566195d99fd6551772bd2",
      "title": "Dishes",
      "content": "Finish dishes before sleeping today.",
      "createdAt": "2022-09-05T02:59:37.201Z",
      "updatedAt": "2022-09-05T07:16:39.865Z",
      "__v": 0
    }, ...
  ]
  ```

### POST /task

- to create a new task
- request body example (both feilds are required)
  ```json
  {
    "title": "Another Task",
    "content": "This is a note for another task which needs to completed this week."
  }
  ```
- response body:
  ```json
  {
    "title": "Another Task",
    "content": "This is a note for another task which needs to completed this week.",
    "_id": "6316543c8cb0ba8fcd0ccc46",
    "createdAt": "2022-09-05T19:55:40.138Z",
    "updatedAt": "2022-09-05T19:55:40.138Z",
    "__v": 0
  }
  ```

### GET /task/:taskID

- get a single task from the tasks list by `taskID`
- response body example:
  ```json
  {
    "_id": "6316543c8cb0ba8fcd0ccc46",
    "title": "Another Task",
    "content": "This is a note for another task which needs to completed this week.",
    "createdAt": "2022-09-05T19:55:40.138Z",
    "updatedAt": "2022-09-05T19:55:40.138Z",
    "__v": 0
  }
  ```

### PUT /task/:taskID

- update the task fields for the given task by `taskID`
- request body example:
  ```json
  {
    "title": "Another  Revised Task",
    "content": "This is a revised note for testing."
  }
  ```
- response body example:
  ```json
  {
    "_id": "6316543c8cb0ba8fcd0ccc46",
    "title": "Another  Revised Task",
    "content": "This is a revised note for testing.",
    "createdAt": "2022-09-05T19:55:40.138Z",
    "updatedAt": "2022-09-05T20:02:43.451Z",
    "__v": 0
  }
  ```

### DELETE /task/:taskID

- delete a task from the tasks list by `taskID`
- response body example: _removed task_
  ```json
  {
    "_id": "6316543c8cb0ba8fcd0ccc46",
    "title": "Another Task",
    "content": "This is a note for another task which needs to completed this week.",
    "createdAt": "2022-09-05T19:55:40.138Z",
    "updatedAt": "2022-09-05T19:55:40.138Z",
    "__v": 0
  }
  ```
