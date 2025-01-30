import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./ContentModal.css";
import Carousel from './Carousel/Carousel'

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "90%",
  height: "80%",
  backgroundColor: "#39445a",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  borderRadius: 10,
  border: "1px solid #282c34",
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState(null);
  const [video, setVideo] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
      );
      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const fetchVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${APP_API_KEY}&language=en-US`
      );
      setVideo(data.results?.[0]?.key || "");
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  useEffect(() => {
    if (media_type && id) {
      fetchData();
      fetchVideo();
    }
  }, [media_type, id]);

  return (
    <>
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && (
              <div className="contentmodal">
                <img
                  alt={content.name || content.title}
                  className="contentportrait"
                  src={
                    content.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${content.poster_path}`
                      : "https://www.movienewz.com/img/films/poster-holder.jpg"

                  }
                />
                <img
                  alt={content.name || content.title}
                  className="contentModal_landscape"
                  src={
                    content.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${content.backdrop_path}`
                      : "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg"
                  }
                />
                <div className="contentModal_about">
                  <span className="contentmodal_title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && <i className="tagline">{content.tagline}</i>}
                  <span className="contentmodal_description">{content.overview}</span>
                  <div className="carousel_container">
                    <Carousel media_type={media_type}
                    id={id}
                    />
                  </div>
                  <div>
                    {video && (
                      <Button
                        variant="contained"
                        startIcon={<YouTubeIcon />}
                        color="secondary"
                        target="_blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                      >
                        Watch the Trailer
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
