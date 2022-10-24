import { Book } from "../api/book";
import { OnMoveBook } from "../hook";
import BookList from "./BookList";

type BookShelfProps = {
    title: string;
    shelf: Book[];
    onMoveBook: OnMoveBook;
};

export default function BookShelf({ title, shelf, onMoveBook }: BookShelfProps) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <BookList list={shelf} onMoveBook={onMoveBook} />
            </div>
        </div>
    );
}