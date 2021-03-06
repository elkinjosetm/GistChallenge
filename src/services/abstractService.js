import axios from 'axios';
import { isUndefined, get } from 'lodash';

export default class AbstractService {
	constructor(baseURL, options) {
		if (isUndefined(baseURL))
			throw new Error('baseURL is required');

		this.baseURL = baseURL;
		this.timeout = get(options, 'timeout', 60000);
	}

	get({
		baseURL,
		endpoint,
		queryParams,
	}) {
		return this.request({
			method : 'GET',
			baseURL,
			endpoint,
			queryParams,
		});
	}

	post({
		baseURL,
		endpoint,
		data,
		queryParams,
		auth,
		headers,
		timeout,
	}) {
		return this.request({
			method : 'POST',
			baseURL,
			endpoint,
			data,
			queryParams,
			auth,
			headers,
			timeout,
		});
	}

	put({
		baseURL,
		endpoint,
		data,
		queryParams,
		auth,
		headers,
		timeout,
	}) {
		return this.request({
			method : 'PUT',
			baseURL,
			endpoint,
			data,
			queryParams,
			auth,
			headers,
			timeout,
		});
	}

	del({
		baseURL,
		endpoint,
		data,
		queryParams,
		auth,
		headers,
		timeout,
	}) {
		return this.request({
			method : 'DELETE',
			baseURL,
			endpoint,
			data,
			queryParams,
			auth,
			headers,
			timeout,
		});
	}

	request({
		baseURL,
		endpoint,
		method = 'GET',
		data,
		queryParams,
		auth,
		headers,
		timeout,
	}) {
		return this.abstractRequest({
			baseURL,
			endpoint,
			method,
			data,
			queryParams,
			auth,
			headers,
			timeout,
		});
	}

	abstractRequest({
		method,
		data,
		auth,
		endpoint : url,
		queryParams : params,
		headers : rawHeaders = {},
		baseURL = this.baseURL,
		timeout = this.timeout,
		withCredentials = true,
	}) {
		const headers = { ...rawHeaders, 'Cache-Control' : 'no-cache' };

		return axios({
			baseURL,
			method,
			data,
			timeout,
			withCredentials,
			auth,
			headers,
			url,
			params,
		});
	}
}
