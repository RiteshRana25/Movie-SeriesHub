import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleContent from "../../Component/SingleContent/SingleContent";
import './Trending.css'
import CustomPagination from "../../Component/CustomPagination/CustomPagination";

const Trending = () => {
  const [page, setPage] = useState(1)
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState()
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchtrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    fetchtrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pagetitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              title={c.title || c.name}
              poster={c.poster_path}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
    </div>
  );
};

export default Trending;
