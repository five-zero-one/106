import { Book } from "../api/book";
import { OnMoveBook, useBook } from "../hook";

type BookCardProps = {
    book: Book;
    // FIXME type-def required
    onMoveBook: OnMoveBook;
};

export default function BookCard({ book, onMoveBook }: BookCardProps) {
    const { shelf, onUpdateShelf } = useBook({ book, onMoveBook });
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{ width: 128, height: 188, backgroundImage: `url("${book.imageLinks?.thumbnail}")` }}
                ></div>
                <div className="book-shelf-changer">
                    <select value={shelf} onChange={onUpdateShelf}>
                        <option disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    );
}