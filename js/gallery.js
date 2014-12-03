window.onload = function () {
	var galleries = [],
		galleryElems = document.querySelectorAll('.gallery');
	for (var key in galleryElems) {
		if(galleryElems.hasOwnProperty(key)) {
			galleries[key] = createAGallerizer();
			galleries[key].init(galleryElems[key]);
		}
	};
}
var createAGallerizer = function () {
	var gallery,
		galleryItemSelector = '.gallery-item',
		galleryWinOpenClass = ' gallerizer-viewbox--open',
		galleryItems,
		err = {
			'noURL': 'No attachment link found, please check if you have set the gallery items to link to their media-files',
		},
		galleryFullElem = document.createElement('div'),
		galleryFullImgElem = document.createElement('img');

		galleryFullElem.appendChild(galleryFullImgElem);

		galleryFullElem.className = 'gallerizer-viewbox'+galleryWinOpenClass;

	function gallerize () {
		galleryItems = gallery.querySelectorAll(galleryItemSelector);
		for(var key in galleryItems) {
			if(galleryItems.hasOwnProperty(key)) {
				galleryItems[key].addEventListener('click', function(e) {
					e.preventDefault();
					openGalleryItem(this);
				});
			}
		}
	}

	function openGalleryItem (item) {
		var galleryIndex = 0,
			child = item;
		while((child = child.previousSibling) != null)
			galleryIndex++;
		openGalleryWin(function () {
			goToGalleryAt(galleryIndex);
		});
	}

	function openGalleryWin (callback) {
		var galleryWinInDoc = document.querySelector('.gallerizer-viewbox');
		if(galleryWinInDoc !== null) {
			if(galleryWinInDoc.className.indexOf(galleryWinOpenClass) > -1) {
				galleryWinInDoc.className += galleryWinOpenClass;
			}
		} else {
			document.body.appendChild(galleryFullElem);
			var galleryWinInDoc = galleryFullElem;
		}
		callback();
	}

	function goToGalleryAt (elemIndex) {
		var item = galleryItems[elemIndex],
			thisURL = item.getElementsByTagName('a')[0].href;
		if(thisURL !== undefined) {
			galleryFullImgElem.src = thisURL;
		} else {
			alert(err['noURL']);
		}
	}

	return {
		init: function (thisGallery) {
			gallery = thisGallery;
			gallerize();
		}
	}
}