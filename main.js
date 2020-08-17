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
            if (this.url) {
                try {
                    this.error = '';
                    this.result = null;
                    if(this.squeeze && !this.squeeze.trim().match(/^[\w\-]+$/i)) throw new Error("Squeeze can be a combination Alphabets and/or Numbers. Squeeze can also include - or _ as special characters.")
                    this.loading = true;
                    window.scrollTo(0, document.body.scrollHeight + 100);
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
                } catch (err) {
                    this.error = err.message;
                }
            } else {
                this.error = "URL is a required field."
            }
        },
    },
});
