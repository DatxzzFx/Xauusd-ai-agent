const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

export default async function handler(req, res) {
    const API_KEY = "543a1d780bc67c29cbac79ea57afb40a";
    const url = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=USD&currencies=XAU`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const price = 1 / data.rates.XAU;
        
        // LOGIKA SIGNAL REAL-TIME
        const lastDigit = parseInt(price.toString().split('.')[1]?.charAt(0) || "5");
        const action = lastDigit >= 5 ? "BUY" : "SELL";
        
        let tp, sl;
        if (action === "BUY") {
            tp = price + 5.00;
            sl = price - 3.00;
        } else {
            tp = price - 5.00;
            sl = price + 3.00;
        }
        
        res.status(200).json({
            price: price.toFixed(2),
            action: action,
            tp: tp.toFixed(2),
            sl: sl.toFixed(2),
            format: `TP : ${tp.toFixed(2)} SL : ${sl.toFixed(2)} ${action}`,
            time: new Date().toISOString()
        });
    } catch (e) {
        res.status(500).json({ error: "SIGNAL_ERROR" });
    }
}