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
  movieTitle: string;
  description: string;
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

export const getGenreById = async (id: string): Promise<Genre | null> => {
  try {
    const doc: DocumentSnapshot = await firestoreRepository.getDocumentById(
      COLLECTION,
      id,
    );
    if (!doc.exists) {
      return null;
    }
    const data: DocumentData = doc.data()!;
    return {
      id: doc.id,
      ...data,
    } as Genre;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateGenre = async (
  id: string,
  genreData: {
    movieTitle?: string;
    description?: string;
    genre?: string;
  },
): Promise<Genre | null> => {
  try {
    const doc: DocumentSnapshot = await firestoreRepository.getDocumentById(
      COLLECTION,
      id,
    );
    if (!doc.exists) {
      return null;
    }
    const data: DocumentData = doc.data()!;
    const updatedGenre: Genre = {
      id: doc.id,
      ...data,
      ...genreData,
    } as Genre;
    await firestoreRepository.updateDocument(COLLECTION, id, genreData);
    return updatedGenre;
  } catch (error: unknown) {
    throw error;
  }
};

export const deleteGenre = async (id: string): Promise<boolean> => {
  try {
    const doc: DocumentSnapshot = await firestoreRepository.getDocumentById(
      COLLECTION,
      id,
    );
    if (!doc.exists) {
      return false;
    }
    await firestoreRepository.deleteDocument(COLLECTION, id);
    return true;
  } catch (error: unknown) {
    throw error;
  }
};
