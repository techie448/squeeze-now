const {schema, urls} = require('./setup');
const { nanoid } = require('nanoid');
const yup = require('yup');
const schema = yup.object().shape({
    slug: yup.string().trim().matches(/^[\w\-]+$/i),
    url: yup.string().trim().url().required(),
});
module.exports  = async (req, res) => {
try {
    let { slug, url } = req.body;
    await schema.validate({slug, url,});

    if (!slug) slug = nanoid(5);
    else if (await urls.findOne({ slug })) throw new Error('Slug already exists in database.');

    slug = slug.toLowerCase();
    const created = await urls.insert({url, slug});

    res.json(created);
} catch (error) {
    res.send({
        message: error.message
    })
}
}
