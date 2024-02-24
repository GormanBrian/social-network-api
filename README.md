# Social Network API

[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)  
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Description

Social Network API created for a microblogging platform using Express and Mongoose.

## Table of Contents

- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Users**: Create, update, and delete users.
- **Thoughts**: Create and delete thoughts for a given user.

## Installation and Setup

1. Clone the repository:

```bash
git clone git@github.com:GormanBrian/social-network-api.git
```

2. Navigate to the project directory:

```bash
cd social-network-api
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

The API should now be running on <http://localhost:3001>.

## Usage

- **/api/users**
  - GET: get all users
  - POST: add a user
  - **/:userId**
    - GET: get a user by ID
    - PUT: update a user by ID
    - DELETE: delete a user by ID
    - **/friends/:friendId**
    - POST: add a friend
    - DELETE: remove a friend
- **/api/thoughts**
  - GET: get all thoughts
  - POST: add a thought
  - **/:thoughtId**
    - GET: get a thought by ID
    - PUT: update a thought by ID
    - DELETE: delete a thought by ID
    - **/reactions**
      - GET: get all reactions for a post by ID
      - **/:reactionId**
        - DELETE: delete a reaction by ID

## Contributing

While this is primarily a personal project, I'm open to suggestions and feedback. If you have ideas or find any issues, please feel free to open an issue or submit a pull request.

## License

This project is open-source and available under the [BSD-3 License](https://opensource.org/licenses/BSD-3-Clause).
