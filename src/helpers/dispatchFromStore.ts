import { Dispatch } from 'react';
import store from '../store';

// https://stackoverflow.com/questions/63060969/argument-of-type-dispatch-dispatch-void-is-not-assignable-to-parameter-o/63221775#63221775
export default store.dispatch as typeof store.dispatch | Dispatch<any>;
