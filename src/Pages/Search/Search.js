import { Button, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import CustomPagination from "../../Component/CustomPagination/CustomPagination";
import SingleContent from "../../Component/SingleContent/SingleContent";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchSearch = async () => {
    const {data}=await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=true`
    );
    setContent(data.results)
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0,0);
    fetchSearch();
    setIsClicked(false);
    // eslint-disable-next-line
  }, [type,page,isClicked])
  

  return (
    <div>
      <div style={{ display: "flex", margin: "15px 0" }}>
        <TextField
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            style: { color: "#fff" },
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
        />
        <Button variant="contained" style={{ marginLeft: "10px" }} onClick={()=>setIsClicked(true)}>
          <SearchIcon style={{ color: "white" }} />
        </Button>
      </div>
      <Tabs
        value={type}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ paddingBottom: 5 }}
      >
        <Tab style={{ width: "50%" }} label="Search Movies"></Tab>
        <Tab style={{ width: "50%" }} label="Search TV Series"></Tab>
      </Tabs>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              title={c.title || c.name}
              poster={c.poster_path}
              date={c.first_air_date || c.release_date}
              media_type={type?"tv":"movie"}
              vote_average={c.vote_average}
            />
          ))}
          {
            searchText && content.length === 0 && (type?<h2>No Search Found</h2>:<h2>No Movies Found</h2>)
          }
      </div>
      {numOfPages>1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
      )}
    </div>
  );
};

export default Search;
