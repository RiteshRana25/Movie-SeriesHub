import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Carousel.css'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const handleDragStart = (e) => e.preventDefault();


const Carousel = ({media_type,id}) => {
	const [credits, setCredits] = useState()
	const API_KEY = process.env.REACT_APP_API_KEY;

	const items=credits?.map((c)=>(
		<div className='carouselitem'>
			<img
			src={c.profile_path ? `https://image.tmdb.org/t/p/w300/${c.profile_path}`:"https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"}
			alt={c?.name}
			onDragStart={handleDragStart}
			className='carouselitem_img'
			/>
			<b className='carouselitem_txt'>{c?.name}</b>
		</div>
	));
	const responsive={
		0:{
			items:3,
		},
		512:{
			items:5,
		},
		1024:{
			items:7,
		}
	};

	const fetchCredits=async()=>{
		const{data}=await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`
		);
		setCredits(data.cast);
	}
	useEffect(() => {
		fetchCredits();
	}, [])
	
return <AliceCarousel autoPlay 
responsive={responsive}
infinite
disableDotsControls
disableButtonsControls
mouseTracking
items={items} />;
};

export default Carousel;

