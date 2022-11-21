import { getPhotosFromServer } from './api.js';

import {initFilters} from './filters.js';
import './upload-modal.js';
import './validate-form.js';
import './scale.js';
import './effects.js';


//получаем все фото
getPhotosFromServer(initFilters);
