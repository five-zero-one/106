import { Link } from "react-router-dom";
import { Book } from "../api/book";
import BookShelf from "../component/BookShelf";
import { OnMoveBook } from "../hook";

type BookPageProps = {
    books: Book[];
    onMoveBook: OnMoveBook;
};

export default function BookPage({ books, onMoveBook }: BookPageProps) {
    const categories: Record<string, Book[]> = { currentlyReading: [], wantToRead: [], read: [] };
    for (const book of books) categories[book.shelf].push(book);

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf title="Currently Reading" {...{ shelf: categories.currentlyReading, onMoveBook }} />
                    <BookShelf title="Want to Read" {...{ shelf: categories.wantToRead, onMoveBook }} />
                    <BookShelf title="Read" {...{ shelf: categories.read, onMoveBook }} />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
}
