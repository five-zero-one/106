import Book from "./Book";

export default function BookList({ list, onMoveBook }) {
    return (
        <ol className="flex flex-wrap justify-center list-none">{list.map((book => (<li className="px-3 py-5 text-left" key={book.id}>
            <Book {...{ book, onMoveBook }} />
        </li>)))}</ol>
    );
}