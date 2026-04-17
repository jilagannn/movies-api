import { db } from "../config/firebaseConfig";

const COLLECTION: string = "ratings";
const TMBD_URL: string = "https://api.themoviedb.org/3";
const TMDB_ACCESS_TOKEN: string | undefined = process.env.TMDB_ACCESS_TOKEN;
const AUTHORIZATION_HEADER: string = `Bearer ${TMDB_ACCESS_TOKEN}`;
const OPTIONS: {
  method: string;
  headers: {
    accept: string;
    Authorization: string;
  };
} = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTHORIZATION_HEADER,
  },
};

const getTMDBData = async (path: string): Promise<object> => {
  const response: globalThis.Response = await fetch(
    `${TMBD_URL}${path}`,
    OPTIONS,
  );

  if (!response.ok) {
    throw new Error("Error: Failed to fetch data");
  }

  // Parse the response into JSON
  const data: object = await response.json();
  console.log("SUCCESS -- Data pulled successfully from TMDB API");

  return data;
};

const seedGenre = async (): Promise<void> => {
  const genresPath: string = "/genre/movie/list?language=en";
  const genreList: object = await getTMDBData(genresPath);

  if (
    !genreList ||
    !("genres" in genreList) ||
    !Array.isArray(genreList.genres)
  ) {
    throw new Error("TMDB response missing genres");
  }

  const batch = db.batch();
  const genreCollection = db.collection(COLLECTION);
  const { genres } = genreList;

  for (const genre of genres) {
    const docRef = genreCollection.doc(String(genre.id));
    batch.set(docRef, {
      genres: genre.name,
    });
  }

  await batch.commit();
  console.log("SUCCESS -- Genre data pulled and written to collection");
};

const clearCollection = async (collectionName: string): Promise<void> => {
  console.log(`Clearing ${collectionName} collection...`);
  const snapshot: FirebaseFirestore.QuerySnapshot = await db
    .collection(collectionName)
    .get();
  const batch: FirebaseFirestore.WriteBatch = db.batch();

  const count: FirebaseFirestore.DocumentData = await db
    .collection(collectionName)
    .count()
    .get();

  if (count.data().count === 0) {
    console.log("Collection is empty");
  } else {
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    if (snapshot.docs.length > 0) {
      await batch.commit();
      console.log(
        `Cleared ${snapshot.docs.length} documents from ${collectionName}`,
      );
    }
  }
};

const initializeSeed = async (): Promise<void> => {
  clearCollection(COLLECTION);
  seedGenre();
};

initializeSeed();
