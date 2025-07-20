// netlify/functions/apiProxy.js

export async function handler(event, context) {
  const API_KEY = process.env.MY_SECRET_API_KEY;

  const response = await fetch('https://example.com/api/data', {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
