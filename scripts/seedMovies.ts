const TMBD_URL: string = "https://api.themoviedb.org/3"
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const AUTHORIZATION_HEADER = `Bearer ${TMDB_ACCESS_TOKEN}`;
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
    const response = await fetch((`${TMBD_URL}${path}`), OPTIONS)

    if (!response.ok) {
        throw new Error("Error: Failed to fetch data");
    };

    // Parse the response into JSON
    const data = await response.json()
    console.log("SUCCESS -- Data pulled successfully from TMDB API")

    console.log(data)
    return data;
};

getTMDBData("/movie/popular?language=en-US");
