const { urls } = require('./setup')
module.exports  = async (req, res) => {
    const { id: slug } = req.query;
    try {
        const url = await urls.findOne({ slug });
        if (url) return res.send(`<script>window.location = '${url.url}';</script>`);
        return res.status(404).send("Not Found");
    } catch (error) {
        return res.status(404).send("Not Found");
    }
}
