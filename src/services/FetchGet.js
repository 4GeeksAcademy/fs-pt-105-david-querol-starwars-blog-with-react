// export the function fetch with promise.all
export const FetchGet = async (urls) => {

	try {
		const promises = urls.map(url => fetch(url));
		const responses = await Promise.all(promises);
		const allData = await Promise.all(responses.map(response => response.json()));
		const allDataArray = allData.map(data => {
			if (data.results) { return data.results } else {
				return data.result;
			}
		});
		return allDataArray;

	} catch (error) {
		console.error('Error al obtener los datos de la API', error)
		return [];
	}
}