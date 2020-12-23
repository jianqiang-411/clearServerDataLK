

const fs = require('fs');
const path = require('path');
// const url = path.join(__dirname, '/web/');
const url = "C:/Users/Administrator/Desktop/202012070/resources/script_res/voice/";

console.error("=-=========url:", url);

fs.readdir(url, 'utf8', (err, fileList) => {
    if (err) throw err;
    fileList.forEach((item, index) => {
        // let length = item.split('.').length;
        //获取文件后缀名
        // let type = '.' + item.split('.')[length - 1];
        let oldName = item;
        //新名称,根据需求修改名称，可以使用正则等等
        // if (item.indexOf(" ") >= 0) {
            // console.error("=============item:", item);
            let newName = item.replace(/\s+/g, "_");
            fs.rename(url + oldName, url + newName, (err) => {
                throw err;
            });
        // }
        
    })
});
