import React from 'react';

const Filter = ({ setFilterType }) => {
	const handleFilterChange = (e) => {
		setFilterType(e.target.value); // Met à jour le type de filtre sélectionné dans l'état parent (App)
	};

	return (
		<div className="mb-3">
			<select className="form-select" onChange={handleFilterChange}>
				<option value="">Aucun filtre</option>
				<option value="date">Par Date</option>
				<option value="category">Par Catégorie</option>
				<option value="lieu">Par Lieu</option>
				<option value="random">Random</option>
			</select>
		</div>
	);
};

export default Filter;
