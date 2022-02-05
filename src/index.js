import ImageApiService from "./api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import LoadMoreBtn from './load-more';
import SimpleLightbox from 'simplelightbox';
import imgCard from './markup.hbs';
import 'simplelightbox/dist/simple-lightbox.min.css';


const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn();

const refs = {
    galleryContainer: document.querySelector(".gallery"),
    searchBtn: document.querySelector(".load-more"),
    searchForm: document.querySelector("#search-form")
}

refs.searchForm.addEventListener("submit", onSearch);
refs.searchBtn.addEventListener("click", findImg);

let hitsLength;

function onSearch(e) {
 e.preventDefault();
    
    imageApiService.query = e.currentTarget.elements.searchQuery.value;

    
    
    if (imageApiService.query === "") {
        return errorOfFind();
    }
    loadMoreBtn.hide();
    imageApiService.resetPage();
    clearGalleryContainer();
    findImg();

    hitsLength = 0;
  
}

async function findImg() {
    const { hits, totalHits } = await imageApiService.fetchImage();

    if (hits.length === 0) {
        loadMoreBtn.hide();
        return errorOfFind();
    }
    hitsLength += hits.length;
  console.log(hitsLength);

  if (hitsLength > totalHits) {
    loadMoreBtn.hide();
    return Notify.info("We're sorry, but you've reached the end of search results");
    }
     renderImageCard(hits);

  loadMoreBtn.show();

  if (imageApiService.page === 2) {
    Notify.success(`Hooray! We found ${totalHits} images.`);
  }
}

function renderImageCard(img) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imgCard(img));

  lightboxGallery.refresh();

  if (imageApiService.page > 2) {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1.6,
      behavior: 'smooth',
    });
  }
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}


    
function errorOfFind() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again');
}

const lightboxOptions = {
  captions: true,
  captionDelay: 250,
  captionsData: 'alt',
};

const lightboxGallery = new SimpleLightbox('.gallery a', lightboxOptions);

