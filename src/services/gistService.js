import { isNull } from 'lodash';
import APIEndpoints from '@config/apiEndpoints';
import AbstractService from './abstractService';

// Singleton instance
let instance = null;

const _SERVICE_UNAVAILABLE_ = 'Service Unavailable';

export default class GistService extends AbstractService {
	static setup(baseURL, options) {
		instance = new GistService(baseURL, options);
	}

	static getInstance() {
		return instance;
	}

	constructor(baseURL, options) {
		super(baseURL, options);

		this.endpoints = {
			users : APIEndpoints.users,
			gists : APIEndpoints.gists,
		};
	}

	static getByUsername(username, { queryParams } = {}) {
		if (isNull(instance))
			return Promise.reject({ message : _SERVICE_UNAVAILABLE_ });

		return instance.get({
			endpoint : `${instance.endpoints.users}/${username}/${instance.endpoints.gists}`,
			queryParams,
		});
	}
}
