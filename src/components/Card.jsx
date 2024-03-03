import React from 'react';
import '../styles/Card.css';

function Card({ image }) {
	return (
		<div className="card mb-3 rounded-0">
			<img src={'/img/' + image.url} className="custom-4x3" alt={image.title} />
			<div className="card-body">
				<h5 className="card-title">{image.title}</h5>
				<p className="card-text">{image.category}</p>
			</div>
		</div>
	);
}

export default Card;
