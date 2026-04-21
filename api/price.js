const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export default async function handler(req, res) {
    const API_KEY = "543a1d780bc67c29cbac79ea57afb40a";
    const url = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=USD&currencies=XAU`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const price = 1 / data.rates.XAU;
        res.status(200).json({ price: parseFloat(price.toFixed(2)) });
    } catch (e) {
        res.status(500).json({ error: "API_ERROR" });
    }
}