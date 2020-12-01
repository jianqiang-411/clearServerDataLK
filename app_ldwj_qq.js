
const http = require('http');
const url = require('url');
const axios = require('axios');

const data = require("./data.json")

let datas = data.details;


function doClean() {
    // axios({
    //     method: 'post',
    //     url: 'https://qq-lgame.chiji-h5.com/server/s/1110446755/update.action',
    //     headers: {
    //         'content-type': 'application/x-www-form-urlencoded' // 默认值
    //     },
    //     data: {
    //         openid: '6318CBA2D1DC1E156F55E58530F7AE0D',
    //         udata: ''
    //     }
    // }).then((res) => {
    //     console.error("=============res:", res);
    // });

    let baseUrl = "https://qq-lgame.chiji-h5.com/server/s/1110446755/update.action?openid=";
    for (const obj of datas) {
        if (obj.qq_openid) {
            axios({
                method: 'get',
                url: baseUrl + obj.qq_openid + "&udata=",
            }).then((res) => {
                if (res.data.ret == 0) {
                    console.warn("=======clean======:", obj.name);
                } else {
                    console.error(res);
                }
            });

        }
    }



}


doClean();

