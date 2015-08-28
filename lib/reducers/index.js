import {createFormReducer} from 'redux-form';
export info from './info';
export auth from './auth';
export const survey = createFormReducer('survey', ['name', 'email', 'occupation']);
