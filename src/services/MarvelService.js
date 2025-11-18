class MarvelService {
    _apiBase = 'https://marvel-server-zeta.vercel.app/';
    // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    _baseOffset = 0;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformChar);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformChar(res.data.results[0])
    }

    getAllComics = async (offset = 0) => {
        const res = await this.getResource(
            `${this._apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${this._apiKey}`
        );
        return res.data.results.map(this._transformComics);
    };

    getComics = async (id) => {
        const res = await this.getResource(`${this._apiBase}comics/${id}?${this._apiKey}`);
        return this._transformComics(res.data.results[0]);
    };

    _transformChar = (char) => {
        return {
            id: char.id,
            name: char.name || 'No name',
            description: char.description ? `${char.description.slice(0, 500)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

    _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "There is no description",
            pageCount: comics.pageCount
                ? `${comics.pageCount} p.`
                : "No information about the number of pages",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || "en-us",
            // optional chaining operator
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : "not available",
        };
    };

}

export default MarvelService;