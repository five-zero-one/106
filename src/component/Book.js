import { useBook } from "../hook";

export default function Book({ book, onMoveBook }) {
    const { shelf, onUpdateShelf } = useBook({ book, onMoveBook });
    return (
        <div className="w-36">
            <div className="relative h-52 flex items-end">
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
            <div className="mt-3 text-xs">{book.title}</div>
            <div className="text-gray-400 text-xs">{book.authors}</div>
        </div>
    );
}
