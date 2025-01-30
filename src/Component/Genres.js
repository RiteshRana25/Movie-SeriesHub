import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  type,
  setPage,
  setGenres,
  genres,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove=(genre)=>{
    setGenres([...genres,genre]);
    setSelectedGenres(selectedGenres.filter((g)=>g.id!==genre.id));
    setPage(1);
  }
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setGenres(data.genres);
  };
  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([]);
      // eslint-disable-next-line
    };
  }, []);
  return (
    <div style={{marginTop:"7px",marginBottom:"7px", padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            size="small"
            key={genre.id}
            clickable
            onDelete={()=>handleRemove(genre)}
            color="primary"
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            size="small"
            key={genre.id}
            clickable
            onClick={()=>handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
