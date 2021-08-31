import { Identifier } from "typescript";

export type Book = {
  book_id: number;
  title: string;
  author: Author[];
  blurb: string;
  image_url: string;
};
export type Author = {
  id: number;
  name: string;
};
export type Update = {
  update_id: number;
  type: string;
  book: Book;
  rating?: number;
  timestamp: number;
};
