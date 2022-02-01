
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
   async fetchImage() {
       const options = {
           params: {
               key: '25477224-484b864fbd655a75604639e30',
               q: this.searchQuery,
               image_type: 'photo',
               orientation: 'horizontal',
               safesearch: true,
               per_page: 40,
               page: this.page,
           },
       };
       const responce = await axios.get('api/', options);
       const dataImages = await responce.data;
       this.incrementPage();
       return dataImages;

    }
    
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        return this.searchQuery = newQuery;
    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }

}

