import {
  QuerySnapshot,
  DocumentData,
  DocumentSnapshot,
} from "node_modules/firebase-admin/lib/firestore";
import { Genre } from "../models/genreModel";
import * as firestoreRepository from "../repositories/firestoreRepository";


const COLLECTION: string = "genres";

export const createGenre = async (genreData: {
  genre: string;
}): Promise<Genre> => {
  const newGenre: Partial<Genre> = {
    ...genreData,
  };

  const genreId: string = await firestoreRepository.createDocument<Genre>(
    COLLECTION,
    newGenre,
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
    const doc: DocumentSnapshot | null =
      await firestoreRepository.getDocumentById(COLLECTION, id);
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
      ...genreData,
    } as Genre;
    await firestoreRepository.updateDocument(COLLECTION, id, updatedGenre);

    return structuredClone(updatedGenre);
  } catch (error: unknown) {
    throw error;
  }
};

export const deleteGenre = async (id: string): Promise<void> => {

  const genre: Genre = await getGenreById(id);

  if (!genre){
        throw new Error("Genre does not exist");
  }

  await firestoreRepository.deleteDocument(COLLECTION,id)
  };
