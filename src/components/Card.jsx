import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import '../styles/Card.css';

function Card({ image }) {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			const cardBodyWidth = document.querySelector('.card-body').offsetWidth;
			setWidth(cardBodyWidth);
			setHeight((4 / 3) * cardBodyWidth);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className="card rounded-0" style={{ width: '100%', height: `${height}px` }}>
			<img src={'/img/' + image.url} alt={image.title} />
			<div className="card-body">
				<p className="card-text">Category: {image.category.join(', ')}</p>
				<div className="content">
					{image.lieu !== '' && (
						<p className="card-text">
							<FontAwesomeIcon className="content-icon" icon={faMapMarkerAlt} />
							{image.lieu}
						</p>
					)}
					{image.time !== '' && (
						<p className="card-text">
							<FontAwesomeIcon className="content-icon" icon={faCalendarDays} />
							{new Date(image.time).toLocaleString().split(' ')[0]}
						</p>
					)}
				</div>

				{image.color.length > 0 && <p className="card-text">Color: {image.color.join(', ')}</p>}
			</div>
		</div>
	);
}

export default Card;
