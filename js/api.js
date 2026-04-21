const API = {
    async fetchSignal() {
        const response = await fetch('/api/signal');
        return response.json();
    }
};