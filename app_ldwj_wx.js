
const http = require('http');
const url = require('url');
const axios = require('axios');

const data = require("./data.json")

let datas = data.details;


function doClean() {
    // https://qq-lgame.chiji-h5.com/server/s/wxccc3cceb50be112b/update.action?openid=oziys5dS-O1Zg2uWKDWHSqK_XyZY&udata=
    let appid = "wx911212e6bc7b2ac0"; //狼的谎言

    let baseUrl = `https://qq-lgame.chiji-h5.com/server/s/${appid}/update.action?openid=`;
    for (const obj of datas) {
        if (obj.wx_openid) {
            axios({
                method: 'get',
                url: baseUrl + obj.wx_openid + "&udata=",
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

