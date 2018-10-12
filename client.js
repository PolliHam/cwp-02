const net = require('net');
const fs = require('fs');
const qa = require('./qa.json');

const port = 8124;
let arr;
const client = new net.Socket();

client.setEncoding('utf8');

client.connect(port, function() {
    fs.readFile('qa.json', 'utf8', (err, data)=> {
        if(err){
            console.log(err);
        }else{
            arr = sortrand(JSON.parse(data));
            console.log('Connected');
            client.write('QA');
        }
    });

});

let count=0;
client.on('data', function(data) {
    if(data === 'ACK'){
        console.log('Вопрос:'+arr[count].q);
        client.write(arr[count].q);
        count++;
    }
    else if (data === 'DEC'){
        client.destroy();
    }
    else{
        if(count < arr.length){
            console.log('Отвер сервера:'+arr[parseInt(data.toString())].a);
            console.log('Правильный ответ:' +arr[count-1].a );
            console.log('Вопрос: '+ arr[count].q);
            client.write(arr[count].q);
            count++;
        }
        else{
            console.log('Отвер сервера:'+arr[parseInt(data.toString())].a);
            console.log('Правильный ответ:' +arr[count-1].a );
            client.destroy();
        }
    }
});

client.on('close', function() {
    console.log('Connection closed');
});

function sortrand(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.ceil(Math.random() * (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}