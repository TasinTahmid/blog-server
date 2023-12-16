const xml2js = require("xml2js");

const changeFormat = {
    json: (data) => (data.blogList ? data.blogList : data),
    xml: (data) => {
        const builder = new xml2js.Builder();
        let objData = data;

        if (data.blogList) {
            objData = {};

            data.blogList.forEach((blog, indx) => {
                objData[`blog_${indx + 1}`] = blog;
            });
        }

        const xmlData = builder.buildObject(objData);
        return xmlData;
    },

    html: (data) => {
        let html = "<ul>";

        if (data.blogList) {
            data.blogList.map((d) => {
                for (const key in d) {
                    if (Object.prototype.hasOwnProperty.call(d, key)) {
                        html += `<li><strong>${key}:</strong> ${d[key]}</li>`;
                    }
                }

                html += "</ul>";
                html += "<ul>";
                return html;
            });
            return html.substring(0, html.length - 4);
        }

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                html += `<li><strong>${key}:</strong> ${data[key]}</li>`;
            }
        }

        html += "</ul>";
        return html;
    },

    text: (data) => {
        let text = "";
        if (data.blogList) {
            data.blogList.map((blog, idx) => {
                text += `blog ${idx + 1}\n`;
                for (let key in blog) {
                    text += `\t${key}: ${blog[key]}\n`;
                }
                text += "\n";
            });
            return text;
        }

        for (let key in data) {
            text += `\t${key}: ${data[key]}\n`;
        }
        return text;
    },
};

const formatData = (format, data) => {
    return changeFormat[format](data);
};

module.exports = formatData;
