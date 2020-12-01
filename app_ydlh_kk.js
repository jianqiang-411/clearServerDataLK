
const http = require('http');
const url = require('url');
const axios = require('axios');

const data = require("./data.json")

let datas = data.details;


function doClean() {
    let baseUrl = "https://qq-lgame.chiji-h5.com/server/s/ydlhkk/update.action?openid=";
    for (const obj of datas) {
        if (obj.ydlhkk) {
            axios({
                method: 'get',
                url: baseUrl + obj.ydlhkk + "&udata=",
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

