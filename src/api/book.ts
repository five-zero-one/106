const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    Accept: "application/json",
    Authorization: token,
};

// NOTE assumption that there will always be a book in the database when this function is called
export const get = async (bookId: string) => {
    const res = await fetch(`${api}/books/${bookId}`, { headers });
    const { book }: { book: Book; } = await res.json();
    return book;
};

export const getAll = async () => {
    const res = await fetch(`${api}/books`, { headers });
    const { books }: { books: Book[]; } = await res.json();
    return books;
};

// NOTE Using a Record<string, string> instead of {currentlyReading:string[], wantToRead:string[], ...} because it works as well 
export const update = async (book: Book, shelf: string): Promise<Record<string, string[]>> => {
    const res = await fetch(`${api}/books/${book.id}`, {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/json", },
        body: JSON.stringify({ shelf }),
    });

    return res.json();
};

// FIXME convert into an async/await function
export const search = (query: string, maxResults: number) =>
    fetch(`${api}/search`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, maxResults }),
    })
        .then((res) => res.json())
        .then((data) => data.books);

export type Book = {
    id: string;
    title: string;
    subtitle: string;
    // NOTE this may be an array
    authors: string;
    // NOTE this could be undefined
    shelf: Shelf;
    imageLinks?: {
        thumbnail?: string;
    };
};

const shelf = ["read", "wantToRead", "currentlyReading"] as const;
export type Shelf = typeof shelf[number];