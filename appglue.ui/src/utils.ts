interface IApi {
    host: string;
    invoke: Function;
}

class Api implements IApi {
    host: string;

    constructor(host: string) {
        this.host = host;
    }

    async invoke(method: string, route: string, payload?: Object): Promise<any> {
        const response = await fetch(`${this.host}/api/${route}`, {
            method: method,
            ...(payload && {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload)
            })
        });

        return response.json();
    }
}

const apiRoute: Api = new Api('http://localhost:3000');

export {
    apiRoute,
}
