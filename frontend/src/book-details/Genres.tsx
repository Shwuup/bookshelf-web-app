import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import "./Genres.css";
import styles from "./Genres.module.css";
const Genres = ({ genres }: any) => {
  const history = useHistory();

  return (
    <div className={styles.genres}>
      <h2>Genres</h2>
      {genres.map((genre: any) => {
        return (
          <Button
            onClick={() => history.push(`/genre/${genre.genre_id}`)}
            className="genreButton"
          >
            {genre.genre_name}
          </Button>
        );
      })}
    </div>
  );
};
export default Genres;
