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
			users    : APIEndpoints.users,
			gists    : APIEndpoints.gists,
			comments : APIEndpoints.comments,
		};
	}

	static getByUsername(username, options = {}) {
		if (isNull(instance))
			return Promise.reject({ message : _SERVICE_UNAVAILABLE_ });

		return instance.get({
			endpoint : `${instance.endpoints.users}/${username}/${instance.endpoints.gists}`,
			...options,
		});
	}

	static getById(gistId, options = {}) {
		if (isNull(instance))
			return Promise.reject({ message : _SERVICE_UNAVAILABLE_ });

		return instance.get({
			endpoint : `${instance.endpoints.gists}/${gistId}`,
			...options,
		});
	}

	static getCommentsById(gistId, options = {}) {
		if (isNull(instance))
			return Promise.reject({ message : _SERVICE_UNAVAILABLE_ });

		return instance.get({
			endpoint : `${instance.endpoints.gists}/${gistId}/${instance.endpoints.comments}`,
			...options,
		});
	}

	static createGist(data, options = {}) {
		if (isNull(instance))
			return Promise.reject({ message : _SERVICE_UNAVAILABLE_ });

		return instance.post({
			endpoint : instance.endpoints.gists,
			data,
			...options,
		});
	}
}
