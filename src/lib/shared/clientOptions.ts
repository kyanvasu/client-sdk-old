type ClientOptions = {
	readonly endpoint: string;
	readonly appKey: string;
	readonly domain?: string,
	readonly cookies?: boolean
};

export default ClientOptions;