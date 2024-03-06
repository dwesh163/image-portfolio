import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './components/Card';
import Filter from './components/Filter'; // Import du composant Filter
import './styles/App.css';

function App() {
	const [images, setImages] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterType, setFilterType] = useState(''); // Ajout de l'état pour le type de filtre
	const cardRefs = useRef([]);

	useEffect(() => {
		fetch('images.json')
			.then((response) => response.json())
			.then((data) => setImages(data))
			.catch((error) => console.error('Error fetching images:', error));
	}, []);

	const filteredImages = images
		.filter((image) => {
			console.log(filterType);

			return image.title.toLowerCase().includes(searchTerm.toLowerCase()) || image.category.toLowerCase().includes(searchTerm.toLowerCase());
		})
		.sort((a, b) => {
			if (filterType === 'date') {
				console.log(b.time, a.time);

				return new Date(b.time) - new Date(a.time);
			}
			if (filterType === 'random') {
				return Math.random() - 0.5;
			}
			return 0;
		});

	return (
		<div className="App">
			<div className="container mt-5 mx-auto">
				<Filter setFilterType={setFilterType} />
				{/*<input type="text" placeholder="Recherche par titre ou catégorie" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control mb-3" />*/}
				<div className="row">
					{filteredImages.map((image, index) => (
						<div key={index} className="col-md-4 mb-4">
							<Card image={image} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
