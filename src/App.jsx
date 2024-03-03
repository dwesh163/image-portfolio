import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './components/Card';

import './styles/App.css';

function App() {
	const [images, setImages] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const cardRefs = useRef([]);

	useEffect(() => {
		fetch('images.json')
			.then((response) => response.json())
			.then((data) => setImages(data))
			.catch((error) => console.error('Error fetching images:', error));
	}, []);

	useLayoutEffect(() => {
		const handleResize = () => {
			cardRefs.current.forEach((cardRef) => {
				if (cardRef) {
					cardRef.style.height = `${cardRef.offsetWidth * (4 / 3)}px`;
				}
			});
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [images]);

	useEffect(() => {
		const handleResize = () => {
			cardRefs.current.forEach((cardRef) => {
				if (cardRef) {
					cardRef.style.height = `${cardRef.offsetWidth * (4 / 3)}px`;
				}
			});
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []); // Run effect only once on initial render

	const filteredImages = images.filter((image) => image.title.toLowerCase().includes(searchTerm.toLowerCase()) || image.category.toLowerCase().includes(searchTerm.toLowerCase()));

	return (
		<div className="App">
			<div className="container mt-5 mx-auto">
				<input type="text" placeholder="Recherche par titre ou catégorie" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control mb-3" />
				<div className="row">
					{filteredImages.map((image, index) => (
						<div key={index} className="col-md-4 mb-4" ref={(ref) => (cardRefs.current[index] = ref)}>
							<Card image={image} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
