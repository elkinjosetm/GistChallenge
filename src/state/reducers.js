import { reducer as nav } from '@redux/nav';
import { reducer as app } from '@redux/app';
import { reducer as gists } from '@redux/gists';

/* ------------- Assemble The Reducers ------------- */
export default {
	nav,
	app,
	gists,
};
