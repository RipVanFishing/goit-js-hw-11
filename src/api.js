
export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
    }
    fetchImage() {
        const API_KEY = "25477224-484b864fbd655a75604639e30";
        const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`;
    
       return fetch(url).then(response => response.json()).then(console.log);
    }
    
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        return this.searchQuery = newQuery;
    }
}

