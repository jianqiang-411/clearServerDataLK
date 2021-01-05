// 加载File System读写模块  
var fs = require('fs');
var readline = require('readline');
var os = require('os');


function main() {
    //读取文件
    // var o = fs.readFileSync('./test.txt','utf-8')
    var o = fs.readFileSync('C:/Users/Administrator/Desktop/stage1_0_28011.txt', 'utf-8')



    //分解txt文件
    let arr = o.split('\r\n')
    let newArr = arr.filter(function (value, index, arr) {
        if (value != '') {
            return true
        }
        return false
    })


    let ts = []
    tsToArr(ts, newArr);

    let arrJson = ["input", "add_chess_count2", "crush_color_count2", "add_color_count2", "pass_condition", "board_grid"];
    let mapJson = {};
    for (const key of arrJson) {
        mapJson[key] = [];
    }

    getArrData(mapJson, arrJson, ts);

    let _haveArrData = false;
    for (const key of arrJson) {
        if (mapJson[key].length > 0) {
            _haveArrData = true;
            break;
        }
    }
    if (_haveArrData) {
        createJsonData(ts, mapJson);
    }

    // return;

    var filename = "C:/Users/Administrator/Desktop/stage1_0_result.json";
    // fs.writeFileSync(filename, JSON.stringify(ts));
    let fWrite = fs.createWriteStream(filename);
    for (let i = 0; i < ts.length; i++) {
        fWrite.write(ts[i]);
    }


}

main();

function createJsonData(ts, mapJson) {
    //为后面引入数组，加个“,”
    ts.splice(ts.length - 2, 1, ts[ts.length - 2] + ",");

    let _idx = 0;
    for (const key in mapJson) {
        if (_idx <= Object.keys(mapJson).length - 1) {
            let arr = mapJson[key];
            for (let i = 0; i < arr.length; i++) {
                let arrOne = arr[i];
                for (let j = 0; j < arrOne.length; j++) {
                    if (i == 0) {
                        if (j == 0) {
                            let str = arrOne[j];
                            str = str.replace("{", "[");
                            ts.splice(ts.length - 1, 0, str);
                            ts.splice(ts.length - 1, 0, "{");
                        } else if (j == arrOne.length - 1) {
                            if (arr.length > 1) {
                                ts.splice(ts.length - 1, 0, "},");
                            } else {
                                ts.splice(ts.length - 1, 0, "}");
                            }
                            let str = arrOne[j];
                            str = str.replace("}", "]");
                            ts.splice(ts.length - 1, 0, str);

                        } else {
                            ts.splice(ts.length - 1, 0, arrOne[j]);
                        }

                    } else {
                        if (j == 0) {
                            ts.splice(ts.length - 2, 0, "{");
                        } else if (j == arrOne.length - 1) {
                            if (i != arr.length - 1) {
                                ts.splice(ts.length - 2, 0, "},");
                            } else {
                                ts.splice(ts.length - 2, 0, "}");
                            }

                        } else {
                            ts.splice(ts.length - 2, 0, arrOne[j]);
                        }

                    }
                }
            }
        }

        _idx++;
    }

    //删除导入数组引入的“],”
    let str = ts[ts.length - 2].replace(",", "");
    ts.splice(ts.length - 2, 1, str);
}

function getArrData(mapJson, arrJson, ts) {
    let idx_start = -1;
    let idx_end = -1;
    for (const key of arrJson) {
        do {
            idx_start = -1;
            idx_end = -1;

            //处理input
            for (let i = 0; i < ts.length; i++) {
                let idx = ts[i].indexOf(key + "\": {");
                if (idx >= 0) {
                    // console.error("================================idx:", i);
                    idx_start = i;
                    break;
                }
            }

            if (idx_start >= 0) {
                //iterator 为起始行，找出结束行
                let cnt = 1; //初始值为1
                for (let i = idx_start + 1; i < ts.length; i++) {
                    if (ts[i].indexOf("{") >= 0) {
                        cnt++;
                    } else if (ts[i].indexOf("}") >= 0) {
                        cnt--;
                        if (cnt == 0) {
                            //表示结束
                            idx_end = i;
                            break;
                        }
                    }

                }

                let arrInput1 = ts.splice(idx_start, idx_end - idx_start + 1);
                // console.log("==================================================");
                // console.log(idx_start);
                // console.log(idx_end);
                mapJson[key].push(arrInput1);
            }

        } while (idx_start >= 0);
    }
}

function tsToArr(ts, newArr) {

    //需要检查是否应该合并成数组 "add_chess_count2",
    let arrJson = ["input"];
    let mapJson = {};
    for (const iterator of arrJson) {
        mapJson[iterator] = 0;
    }

    let len = newArr.length
    let str;
    let arr;
    for (let i = 0; i < len; i++) {
        if (newArr[i].indexOf(" {") >= 0) {
            str = newArr[i];
            str = str.trim();
            arr = str.split(" ");
            newArr[i] = `"${arr[0]}": ${arr[1]}`;

            if (arrJson.includes(arr[0])) {
                mapJson[arr[0]]++;
            }

        } else if (newArr[i].indexOf("}") >= 0) {
            if (i != len - 1) {
                if (i + 1 < len) {
                    if (newArr[i + 1].indexOf("}") == -1) {
                        newArr[i] = newArr[i].replace("}", "},").trim();
                    }
                }

            }
        } else if (newArr[i].indexOf(": ") >= 0) {
            str = newArr[i];
            arr = str.split(": ");
            let reg = /^[0-9]|[-][0-9]/
            if (arr[1].search(reg) >= 0) {
                str = `"${arr[0].trim()}": ${arr[1]}`;
            } else {
                if (arr[1].indexOf("\"") >= 0) {
                    str = `"${arr[0].trim()}": ${arr[1]}`;
                } else {
                    str = `"${arr[0].trim()}": "${arr[1]}"`;
                }

            }

            if (i + 1 < len) {
                if (newArr[i + 1].indexOf("}") == -1) {
                    str += ",";
                }
            }
            newArr[i] = str;
        } else {
            newArr[i] = newArr[i].trim();
        }

        ts.push(newArr[i])

    }
    ts.unshift("{");
    ts.push("}");
}
