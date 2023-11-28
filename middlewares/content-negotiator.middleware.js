
module.exports = (req, res, next) => {

    console.log(req.accepts(['json', 'xml', 'html', 'text']))//////

    switch (req.accepts(['json', 'xml', 'html', 'text'])) {
        case 'json':
            res.type('json');
            break
        case 'xml':
            res.type('html');
            break
        case 'html':
            res.type('html');
            break
        case 'text':
            res.type('plain');
            break
        default:
            res.type('json');
            break
      }

    next();
}