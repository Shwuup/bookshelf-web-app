export type Book = {
  book_id: number;
  title: string;
  author: Author[];
  blurb: string;
  image: string;
  isbn?: string;
  pub_date?: string;
  pages?: number;
  language?: string;
  edition?: string;
  publisher?: Publisher;
  genre?: Genre[];
};
export type PartialBook = Partial<Book>;
export type Author = {
  id: number;
  name: string;
};

export type BookStatus = {
  book_status_id?: number;
  book: Book;
  status: string;
  rating: number;
  timestamp: number;
};

export type Update = {
  update_id?: number;
  rating: number;
  status: string;
  timestamp: number;
  book_status: BookStatus;
};

export type User = {
  id: number;
};

export type Publisher = {
  publisher_id: number;
  publisher_name: string;
};
export type Genre = {
  genre_id: number;
  genre_name: string;
};
