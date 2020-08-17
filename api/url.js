const {urls} = require('./setup');
const { nanoid } = require('nanoid');
const yup = require('yup');
const schema = yup.object().shape({
    squeeze: yup.string().trim().matches(/^[\w\-]+$/i),
    url: yup.string().trim().url().required(),
});
module.exports  = async (req, res) => {
try {
    let { squeeze, url } = req.body;
    await schema.validate({squeeze, url,});

    if (!squeeze) squeeze = nanoid(5);
    else if (await urls.findOne({ squeeze })) throw new Error('Squeeze already exists in database. 🚫');

    squeeze = squeeze.toLowerCase();
    const created = await urls.insert({url, squeeze});
    res.json({...created});
} catch (error) {
    res.status(400).json({
        message: error.message
    })
}
}
