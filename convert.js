import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const imagesDirectory = './public/img';

const images = [];

// Lire le contenu du dossier
fs.readdir(imagesDirectory, (err, files) => {
	if (err) {
		console.error('Erreur lors de la lecture du dossier :', err);
		return;
	}

	// Filtrer les fichiers pour ne garder que les images (extensions .jpg, .jpeg, .png, etc.)
	const imageFiles = files.filter((file) => {
		const ext = path.extname(file).toLowerCase();
		return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif';
	});

	// Parcourir les fichiers d'images pour créer les entrées JSON
	imageFiles.forEach((file, index) => {
		if (!isImageAlreadyAdded(file)) {
			images.push({
				url: file, // URL de l'image (supposant que l'extension est .jpg)
				title: 'image', // Titre généré pour l'image
				category: [], // Catégorie déduite du nom du fichier
				time: Date.now(),
				color: [],
				lieu: '',
			});
		}
	});

	// Écrire le tableau d'images dans un fichier JSON
	if (images.length > 0) {
		let existingImages = [];
		try {
			const jsonData = fs.readFileSync('images.json', 'utf8');
			existingImages = JSON.parse(jsonData);
		} catch (error) {
			console.log("Le fichier JSON n'existe pas ou est vide.");
		}

		const allImages = existingImages.concat(images);

		const jsonData = JSON.stringify(allImages, null, 2);
		fs.writeFileSync('images.json', jsonData);
		console.log('Fichier JSON mis à jour avec succès !');
	} else {
		console.log('Aucune nouvelle image à ajouter.');
	}
});

// Fonction utilitaire pour déduire la catégorie du nom de fichier
function getCategoryFromFileName(filename) {
	// Supposons que le nom de fichier est au format "nom_de_la_catégorie-nom_de_l'image.ext"
	const categoryName = filename.split('-')[0];
	return categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
}

// Fonction utilitaire pour vérifier si une image avec la même URL est déjà ajoutée
function isImageAlreadyAdded(imageUrl) {
	let existingImages = [];
	try {
		const jsonData = fs.readFileSync('images.json', 'utf8');
		existingImages = JSON.parse(jsonData);
	} catch (error) {
		console.log("Le fichier JSON n'existe pas ou est vide.");
	}

	return existingImages.some((image) => image.url === imageUrl);
}
