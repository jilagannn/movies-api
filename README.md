# Movies API

## Project Overview

This project provides a RESTful API for managing movies. With this API, it allows film curators to manage movies, movie genres, and movie ratings.

## Requirements

Before installing, make sure to have the following installed and set up:

- **Node.js:** LTS version recommended (v20.x). You can download it from [nodejs.org](https://nodejs.org/).
- **npm:** Usually included with Node.js.
- **Firebase Project:** Create a project on Firebase through here [firebase.com](https://console.firebase.google.com/).
- **TMDB API KEY:** Sign up for an API key through here [tmdb.com](https://www.themoviedb.org/)

## Installation

To get this RESTful API backend up and running on your local machine, follow these simple steps:

1. **Clone the repository:**

    First, open your terminal. Go to the folder where you want the project. Run this command:

    ```bash
    git clone https://github.com/jilagannn/movies-api
    ```

2. **Navigate to the project directory:**

    Next, go into the project folder you just cloned:

    ```bash
    cd movies-api
    ```

3. **Install dependencies:**

    Inside the specified project directory, install all the needed packages with npm:

    ```bash
    npm install
    ```

4. **Environment Variables:**

    Create a `.env` file in the root of the project directory then fill in the required values.

    ```dotenv
    NODE_ENV=development
    PORT=3000
    FIREBASE_PROJECT_ID=<your_firebase_project_id>
    FIREBASE_PRIVATE_KEY=<your_firebase_private_key_including_newlines>
    FIREBASE_CLIENT_EMAIL=<your_firebase_client_email>
    SWAGGER_SERVER_URL=http://localhost:3000/api/v1
    TMDB_ACCESS_TOKEN=<your_access_token_here>
    TMDB_API_KEY=<your_api_key_here>
    ```

5. **Run Seed Scripts:**

    Populate your database with data from TMDB using seed script by executing the following in the root directory.

    Movies:

    ```bash
    npx tsx --env-file=.env scripts/seedMovies.ts
    ```

    Genres:

    ```bash
    npx tsx --env-file=.env scripts/seedGenres.ts
    ```

    Ratings:

    ```bash
    npx tsx --env-file=.env scripts/ratingSeed.ts
    ```

6. **Start the application:**

    Start the app using the command specified in `package.json` (check the `scripts` section).

    ```bash
    npm start
    ```

The API server should now be running. You can usually access it at `http://localhost:3000`. Check your configuration or `.env` file for the correct port number.

## Example API Requests

### Get All Movies

**Request:**

```bash
curl --request GET \
  --url http://localhost:3000/api/v1/movies \
  --header 'authorization: Bearer authTokenHere'
```

**Response:**

```bash
{
  "message": "Movies retrieved successfully",
  "count": 21,
  "data": [
    {
      "id": "1049471",
      "movieTitle": "Outcome",
      "description": "Reef Hawk, Hollywood's poster child since age six, is not okay. When he learns about an extortion plot tied to a mysterious video, Reef preemptively sets out on a redemption tour to make amends, confront his demons, and avoid getting canceled.",
      "genres": [
        "Comedy",
        "Drama"
      ],
      "runTime": "84",
      "actors": [
        "Keanu Reeves",
        "Jonah Hill",
        "Cameron Diaz",
        "Matt Bomer",
        "Susan Lucci",
        "Laverne Cox"
      ],
      "director": "Jonah Hill"
    },
    {
      "id": "1084577",
      "movieTitle": "Balls Up",
      "description": "Two marketing executives go \"balls out\" and pitch a bold full‑coverage condom sponsorship with the World Cup. After their drunken celebration in Brazil sparks a global scandal, they must outrun furious fans, criminals, and power-hungry officials to salvage their careers and make it home alive.",
      "genres": [
        "Comedy",
        "Action",
        "Adventure"
      ],
      "runTime": "104",
      "actors": [
        "Mark Wahlberg",
        "Paul Walter Hauser",
        "Sacha Baron Cohen",
        "Benjamin Bratt",
        "Luciano Szafir",
        "Eva De Dominici"
      ],
      "director": "Peter Farrelly"
    },
    {
      "id": "1159559",
      "movieTitle": "Scream 7",
      "description": "When a new Ghostface killer emerges in the quiet town where Sidney Prescott has built a new life, her darkest fears are realized as her daughter becomes the next target. Determined to protect her family, Sidney must face the horrors of her past to put an end to the bloodshed once and for all.",
      "genres": [
        "Horror",
        "Mystery",
        "Crime"
      ],
      "runTime": "114",
      "actors": [
        "Neve Campbell",
        "Courteney Cox",
        "Isabel May",
        "Jasmin Savoy Brown",
        "Mason Gooding",
        "Roger L. Jackson"
      ],
      "director": "Kevin Williamson"
    }
  ]
}
```

### Get Movie By ID

**Request:**

```bash
curl --request GET \
  --url http://localhost:3000/api/v1/movies/1159559 \
  --header 'authorization: Bearer authTokenHere'
```

**Response:**

```bash
{
  "message": "Movie retrieved successfully",
  "data": {
    "id": "1159559",
    "movieTitle": "Scream 7",
    "description": "When a new Ghostface killer emerges in the quiet town where Sidney Prescott has built a new life, her darkest fears are realized as her daughter becomes the next target. Determined to protect her family, Sidney must face the horrors of her past to put an end to the bloodshed once and for all.",
    "genres": [
      "Horror",
      "Mystery",
      "Crime"
    ],
    "runTime": "114",
    "actors": [
      "Neve Campbell",
      "Courteney Cox",
      "Isabel May",
      "Jasmin Savoy Brown",
      "Mason Gooding",
      "Roger L. Jackson"
    ],
    "director": "Kevin Williamson"
  }
}
```

### Create Movie

**Request:**

```bash
curl --request POST \
  --url http://localhost:3000/api/v1/movies/ \
  --header 'authorization: Bearer authTokenHere' \
  --header 'content-type: application/json' \
  --data '{
  "movieTitle": "Final Project Documentart",
  "description": "The time where team 3 recorded their api",
  "genres": [
    "Documentary",
    "Adventure",
    "Live-Action"
  ],
  "runTime": "0h 15m",
  "actors": [
    "Johnson Nguyen",
    "jheyrus Ilagan"
  ],
  "director": "Mateo"
}'
```

**Response:**

```bash
{
  "message": "Movie created successfully",
  "data": {
    "id": "7xmjVeVbptJLqv0637wX",
    "movieTitle": "Final Project Documentart",
    "description": "The time where team 3 recorded their api",
    "genres": [
      "Documentary",
      "Adventure",
      "Live-Action"
    ],
    "runTime": "0h 15m",
    "actors": [
      "Johnson Nguyen",
      "jheyrus Ilagan"
    ],
    "director": "Mateo"
  }
}
```

See full API documentation below for all other requests for movies, genres, and ratings endpoint.

## Link to Public Documentation

Full API documentation is available at: [movies-api-godaddy.vercel.app/](https://movies-api-godaddy.vercel.app/api-docs/)

## Local Documentation Access

When running the API locally, it can be accessed at: [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)
