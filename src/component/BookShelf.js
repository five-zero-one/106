import BookList from "./BookList";

export default function BookShelf({ title, shelf, onMoveBook }) {
    return (
        <div className="bookshelf">
            <h2 className="border-b border-gray-200 text-xl font-bold">{title}</h2>
            <div className="text-center">
                <BookList list={shelf} onMoveBook={onMoveBook} />
            </div>
        </div>
    );
}