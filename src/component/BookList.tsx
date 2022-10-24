import { Book } from "../api/book";
import { OnMoveBook } from "../hook";
import BookCard from "./BookCard";

type BookListProps = {
    list: Book[];
    onMoveBook: OnMoveBook;
};

export default function BookList({ list, onMoveBook }: BookListProps) {
    return (
        <ol className="books-grid">{list.map((book => (<li className="px-3 py-5 text-left" key={book.id}>
            <BookCard {...{ book, onMoveBook }} />
        </li>)))}</ol>
    );
}