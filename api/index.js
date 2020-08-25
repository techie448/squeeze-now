const { urls } = require('./setup')
module.exports  = async (req, res) => {
    const { id: squeeze } = req.query;
    try {
        const url = await urls.findOne({ squeeze });
        if (url) return res.send(`<script>window.location = '${url.url}';</script>`);
        return res.status(404).send(`<script>window.location = '/notFound.html';</script>`);
    } catch (error) {
        return res.status(404).send(`<script>window.location = '/notFound.html';</script>`);
    }
}
