import { db } from "../config/firebaseConfig";

const COLLECTION: string = "movies";
const TMBD_URL: string = "https://api.themoviedb.org/3"
const TMDB_ACCESS_TOKEN: string | undefined = process.env.TMDB_ACCESS_TOKEN;
const AUTHORIZATION_HEADER: string = `Bearer ${TMDB_ACCESS_TOKEN}`;
const OPTIONS: {
    method: string,
    headers: {
        accept: string,
        Authorization: string
    }
} = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: AUTHORIZATION_HEADER
    }
}

const getTMDBData = async (
    path: string
): Promise<object> => {
    const response: globalThis.Response = await fetch((`${TMBD_URL}${path}`), OPTIONS)

    if (!response.ok) {
        throw new Error("Error: Failed to fetch data");
    };

    // Parse the response into JSON
    const data: object = await response.json()
    console.log("SUCCESS -- Data pulled successfully from TMDB API")

    console.log(data)
    return data;
};

const clearCollection = async(collectionName: string): Promise<void> => {
    console.log(`Clearing ${collectionName} collection...`);
    const snapshot: FirebaseFirestore.QuerySnapshot = await db.collection(collectionName).get();
    const batch: FirebaseFirestore.WriteBatch = db.batch();

    const count: FirebaseFirestore.DocumentData= await db.collection(collectionName).count().get();

    if (count.data().count === 0 ) {
        console.log("Collection is empty");

    } else{
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        if (snapshot.docs.length > 0) {
            await batch.commit();
            console.log(`Cleared ${snapshot.docs.length} documents from ${collectionName}`);
        };
    };
};

/**
 * Represents the needed properties for pulling movie details + credits from each movie in popular movies
 */
interface TMDBMovieDetails {
    title: string;
    overview: string;
    runtime: number;
    genres: {name: string}[];
    credits: {
        cast: { name: string;}[];
        crew: { name: string; job: string }[];
    };
};

const seedMovie = async (): Promise<void> => {
    const popularPath: string = "/movie/popular?language=en-US"
    const popularMovies = await getTMDBData(popularPath);

    if (!popularMovies || !("results" in popularMovies) || !Array.isArray(popularMovies.results)) {
        throw new Error("TMDB response missing results for popular movies");
    };

    const batch = db.batch();
    const movieCollection = db.collection(COLLECTION);

    for (const movie of popularMovies.results) {
        
        // use append to response because TMDB allows users to stack requests with append_to_response
        const moviePathId = `/movie/${movie.id}?append_to_response=credits`
        const movieDetails = await getTMDBData(moviePathId);
        if (!movieDetails || !("title" in movieDetails) || !("overview" in movieDetails) || !("runtime" in movieDetails) || !("genres" in movieDetails) || !("credits" in movieDetails)) {
            throw new Error(`TMDB response missing details for movie ${movie.id}`);
        }

        const { title, overview, genres, runtime, credits } = movieDetails as TMDBMovieDetails;

        // map genres from api onto an array
        const genreList  = genres.map(genre => genre.name);

        // map actors from api onto an array (except we only do the first 6 treating it like the main cast)
        const actors = credits.cast.slice(0, 6);
        const actorsList = actors.map(actors => actors.name);

        // using the find array method to search for the director amongst the people in the crew array but can lowkey be undefined too (no director since find method)
        const director = credits.crew.find(employee => employee.job === "Director")?.name || undefined;

        const docRef = movieCollection.doc(String(movie.id))
        const movieDoc: {
            movieTitle: string,
            description: string,
            genres: string[],
            runTime: string,
            actors: string[],
            director: string | undefined
        } = {
            movieTitle: title,
            description: overview,
            genres: genreList,
            runTime: String(runtime),
            actors: actorsList,
            director: director
        };

        batch.set(docRef, movieDoc)
    };

    await batch.commit()
    console.log("SUCCESS -- Movie data pulled and written to collection");
};

seedMovie();
