const {urls} = require('./setup');
const { nanoid } = require('nanoid');
const yup = require('yup');
const schema = yup.object().shape({
    squeeze: yup.string().trim().matches(/^[\w\-]+$/i),
    url: yup.string().trim().url().required(),
});
module.exports  = async (req, res) => {

try {
    console.log('hello')
    console.log(req.method)
    if(req.method === 'GET'){
        const {  id: squeeze } = req.query;
        const urlObj = await urls.findOne({ squeeze });
        if(urlObj){
            return res.json({
                url: urlObj.url,
                squeeze: urlObj.squeeze
            });
        }else throw new Error("Squeeze Not Found.")

    }else if(req.method === 'POST'){
    let { squeeze, url } = req.body;
    await schema.validate({squeeze, url,});

    if (!squeeze) squeeze = nanoid(5);
    else if (await urls.findOne({ squeeze })) throw new Error('Squeeze already exists in database. 🚫');

    squeeze = squeeze.toLowerCase();
    const created = await urls.insert({url, squeeze});
    res.json({...created});
    }else {
        throw new Error('INVALID API REQUEST. 🚫');
    }
} catch (error) {
    if(error.name==="ValidationError" && error.path === "squeeze"){
        res.status(400).json({
            message: "Squeeze can be a combination Alphabets and/or Numbers. Squeeze can also include - or _ as special characters."
        })
    }
    else res.status(400).json({
            message: error.message
        })
    }
}
