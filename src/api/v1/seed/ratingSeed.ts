import { db } from "../../../../config/firebaseConfig";

const COLLECTION: string = "ratings";
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

    return data;
};

const clearCollection = async(collectionName: string): Promise<void> => {
    console.log(`Clearing ${collectionName} collection...`);
    const snapshot: FirebaseFirestore.QuerySnapshot = await db.collection(collectionName).get();
    const batch: FirebaseFirestore.WriteBatch = db.batch();

    const count: FirebaseFirestore.DocumentData = await db.collection(collectionName).count().get();

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
 * Represents the needed properties for pulling reviews from each movie in popular movies
 */
interface TMDBRatingDetails {
    content: string;
    author_details: {
        rating: number
    }
};

const seedRatings = async (): Promise<void> => {
    const popularPath: string = "/movie/popular?language=en-US"
    const popularMovies: object = await getTMDBData(popularPath);

    if (!popularMovies || !("results" in popularMovies) || !Array.isArray(popularMovies.results)) {
        throw new Error("TMDB response missing results for popular movies");
    };

    const batch = db.batch();
    const ratingsCollection = db.collection(COLLECTION);

    for (const movie of popularMovies.results) {
        
        // use append to response because TMDB allows users to stack requests with append_to_response
        const ratingsPathId = `/movie/${movie.id}/reviews`
        const ratings = await getTMDBData(ratingsPathId);
        if (!ratings || !("results" in ratings) || !Array.isArray(ratings.results)) {
            throw new Error(`TMDB response missing reviews for movie: ${movie.id}`);
        }

        // get the reviews as an array and then only get 5 rewviwes per moviezz
        const ratingDetails = ratings.results;
        const maxReviews = ratingDetails.slice(0,5)

        for (const review of maxReviews) {
            const { content, author_details } = review as TMDBRatingDetails;
            const docRef = ratingsCollection.doc(String(review.id))
            const ratingDoc = {
                movieTitle: movie.title,
                rating: author_details.rating || 0,
                review: content,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            batch.set(docRef, ratingDoc)
        }
    };

    await batch.commit()
    console.log("SUCCESS -- Rating data pulled and written to collection");
};

const startSeed = async(): Promise<void> => {
    clearCollection(COLLECTION);
    seedRatings();
};

startSeed();
