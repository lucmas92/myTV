// .netlify/functions/apiProxy.js

export async function handler(event, context) {

    // const API_KEY = process.env.MY_SECRET_API_KEY;
    const API_KEY = `gu1d4tv53gr3t4`;

    const response = await fetch('https://epgnew.guidatvoggi.it/0', {
        method: 'POST',
        headers: {
            'epgguidatv': API_KEY
        }
    });

    const data = await response.json();

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // puoi mettere un dominio specifico al posto di *
            "Access-Control-Allow-Headers": "Content-Type"
        },
        body: JSON.stringify(data)
    };
}
