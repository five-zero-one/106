import { ChangeEvent, useEffect, useState } from "react";
import { Book, get, getAll, search, Shelf, update } from "../api/book";

export const useBook = ({ book, onMoveBook }: { book: Book; onMoveBook: OnMoveBook; }) => {
    const [shelf, setShelf] = useState(book.shelf);

    useEffect(() => {
        (async () => {
            book.shelf !== shelf &&
                onMoveBook({ book, shelf });
        })();
    }, [shelf, book, onMoveBook]);

    return {
        shelf,
        onUpdateShelf: (e: ChangeEvent<HTMLSelectElement>) => setShelf(e.target.value as Shelf)
    };
};


export const useSearch = ({ books }: { books: Book[]; }) => {
    const [query, setQuery] = useState("");
    const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);

    useEffect(() => {
        (async () => {
            const result = await search(query, 10);
            if (result && "error" in result) {
                result.error;
            }
            if (result && "map" in result)
                // TODO clean this up
                setSearchedBooks(result.map((book: Book) =>
                    books.find(({ id }) => id === book.id) ?? { ...book, shelf: "none" }));
            else
                setSearchedBooks([]);
        })();
    }, [query, books]);

    return {
        searchedBooks,
        query,
        onQuery: (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    };
};


export const useApp = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        (async () => {
            setBooks(await getAll());
        })();
    }, []);


    const onMoveBook: OnMoveBook = async ({ book, shelf }) => {
        if ((await update(book, shelf))[shelf]?.includes(book.id))
            // NOTE a away of not requiring an API call here?
            setBooks(books.filter(({ id }) => id !== book.id).concat((await get(book.id))));
        else
            setBooks(books.filter(({ id }) => id !== book.id));
    };

    return {
        books,
        onMoveBook,
    };
};

export type OnMoveBook = (args: { book: Book, shelf: Shelf; }) => Promise<void>;