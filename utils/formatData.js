const xml2js = require('xml2js');

const changeFormat = {
    "application/json": data => data.blogList ? data.blogList : data
    ,

    "application/xml": data => {
        const builder = new xml2js.Builder();
        let objData = data;
        
        if(data.blogList){ 
            objData = {};

            data.blogList.forEach((blog, indx) => {
                objData[`blog_${indx}`] = blog;
            })
        }

        const xmlData = builder.buildObject((objData));
        return xmlData;
    },

    "text/html": data => {
        let html = '<ul>';

        if(data.blogList){
            data.blogList.map(d => {
                for (const key in d) {
                    if (d.hasOwnProperty(key)) {
                    html += `<li><strong>${key}:</strong> ${d[key]}</li>`;
                    }
                }
        
                html += '</ul>';
                html += '<ul>';
                return html;
            })
            return html.substring(0, html.length - 4);
        }

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
            html += `<li><strong>${key}:</strong> ${data[key]}</li>`;
            }
        }

        html += '</ul>';
        return html;
    },

    "text/plain": data => data.blogList ? JSON.stringify(data.blogList) : JSON.stringify(data) 
};

const formatData = (contentType, data) => {
    const format = contentType.split(";")[0];
    console.log("fomrat",format)
    return changeFormat[format](data);
}

module.exports = formatData;