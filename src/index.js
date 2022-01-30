import ImageApiService from "./api";


const imageApiService = new ImageApiService();
const refs = {
    galleryContainer: document.querySelector(".gallery"),
    searchBtn: document.querySelector(".load-more"),
    searchForm: document.querySelector("#search-form")
}

refs.searchForm.addEventListener("submit", onSearch);
refs.searchBtn.addEventListener("click", onLoadMore);


function onSearch(e) {
 e.preventDefault();
    console.log(e);
    imageApiService.query = e.target.input.value;

imageApiService.fetchImage(searchQuery);
  
}

function onLoadMore() {
    imageApiService.fetchImage(searchQuery);
}



