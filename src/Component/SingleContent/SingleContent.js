import React from "react";
import "./SingleContent.css";
import { Badge } from "@mui/material";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  title,
  poster,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge badgeContent={vote_average} color={vote_average>6?'primary':'secondary'}/>
      <img
  className="poster"
  src={poster ? `https://image.tmdb.org/t/p/w300${poster}` : "https://www.movienewz.com/img/films/poster-holder.jpg"
}
  alt={title}
/>
      <b className="title">{title}</b>
      <span className="subtitle">
        {media_type==='tv'?"TV Series":"Movie"}
        <span className="subtitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
