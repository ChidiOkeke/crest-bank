# Crest Bank API

Welcome to the Crest Bank API! This repository contains the source code for a basic banking API built using Express.js and MongoDB, with JWT-based authentication and authorization.

## Getting Started

These instructions will help you set up the project locally for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB
- Redis (for refresh token storage)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/ChidiOkeke/crest-bank.git

   cd crest-bank

   ```

2. Install dependencies:

   ```sh
   yarn install
   ```

3. Create .env.dev and .env.dist files in the root directory and set your environment variables. You can use the .env.example file as a reference.

### Running the Server

Start MongoDB and Redis servers.

Run the development server:

```sh
yarn dev
```

Build for production:

```sh
yarn build
```

Run the production server:

```sh
yarn start
```

### API Documentation

Access the Swagger API documentation by visiting http://localhost:3000/docs in your web browser. This documentation provides detailed information about available routes and endpoints.

Select the appropriate server from the list of servers available.


