import {
  QuerySnapshot,
  DocumentData,
  DocumentSnapshot,
} from "node_modules/firebase-admin/lib/firestore";
import { Genre } from "../models/genreModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
import { db } from "../../../../config/firebaseConfig";

const COLLECTION: string = "genres";

export const createGenre = async (genreData: {
  genre: string;
}): Promise<Genre> => {
  const newGenre: Partial<Genre> = {
    ...genreData,
  };
  const collectionCount = await db.collection(COLLECTION).count().get();

  const numberOfGenres: number = collectionCount.data().count;

  const genreId: string = await firestoreRepository.createDocument<Genre>(
    COLLECTION,
    newGenre,
    (numberOfGenres + 1).toString(),
  );
  return structuredClone({ id: genreId, ...newGenre } as Genre);
};

export const getAllGenres = async (): Promise<Genre[]> => {
  try {
    const snapshot: QuerySnapshot =
      await firestoreRepository.getDocuments(COLLECTION);
    const genres: Genre[] = snapshot.docs.map((doc) => {
      const data: DocumentData = doc.data();
      return {
        id: doc.id,
        ...data,
      } as Genre;
    });
    return genres;
  } catch (error: unknown) {
    throw error;
  }
};

export const getGenreById = async (id: string): Promise<Genre> => {
  try {
    const doc: DocumentSnapshot | null = await firestoreRepository.getDocumentById(
      COLLECTION,
      id,
    );
    if (!doc) {
      throw new Error("Genre not found");
    }
    const data: DocumentData = doc.data()!;
    const genre: Genre = {
      id: doc.id,
      ...data,
    } as Genre;
    return structuredClone(genre);
  } catch (error: unknown) {
    throw error;
  }
};

export const updateGenre = async (
  id: string,
  genreData: {
    genre: string;
  },
): Promise<Genre> => {
  try {
    const genre: Genre = await getGenreById(id);


    const updatedGenre: Genre = {
      ...genre,
      ...genreData
    } as Genre;
    await firestoreRepository.updateDocument(COLLECTION, id, updatedGenre);

    return structuredClone(updatedGenre);
  } catch (error: unknown) {
    throw error;
  }
};

export const deleteGenre = async (id: string): Promise<boolean> => {
  try {
    const doc: DocumentSnapshot | null = await firestoreRepository.getDocumentById(
      COLLECTION,
      id,
    );
    if (!doc) {
     throw new Error ("Genre not found")
    }
    await firestoreRepository.deleteDocument(COLLECTION, id);
    return true;
  } catch (error: unknown) {
    throw error;
  }
};
