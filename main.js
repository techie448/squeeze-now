const app = new Vue({
    el: '#app',
    data: {
        url: '',
        squeeze: '',
        error: '',
        result: null,
        loading: false,
    },
    methods: {
        async squeezeNow() {
            this.error = '';
            this.result = null;
            this.loading = true;
            window.scrollTo(0,document.body.scrollHeight+100);
            const response = await fetch('/api/url', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    url: this.url,
                    squeeze: this.squeeze || undefined,
                }),
            });
            if (response.ok) {
                const result = await response.json();
                this.loading = false;
                this.result = `https://squeeze.now.sh/${result.squeeze}`;
                this.squeeze = '';
                this.url = '';
            } else {
                const result = await response.json();
                this.loading = false;
                this.error = result.message;
            }
        },
    },
});
