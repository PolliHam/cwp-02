const net = require('net');
const fs = require('fs');
const port = 8124;
let seed = 0;
const server = net.createServer((client) => {
    console.log('Client connected');
    client.setEncoding('utf8');
    client.id = Date.now() + seed++;
    client.log = fs.createWriteStream('client'+client.id+'.txt');
    client.ACK = false;
    client.on('data', (data) => {
        console.log(data);
        if (data === 'QA')
        {
            client.ACK= true;
            client.write('ACK');
        }
        else if(!client.ACK){
            client.write('DEC');
        }
        else {
            print(client,'Client: '+ data);
            let rand = Math.random()*5;
            rand = Math.ceil(rand);
            client.write(rand);
            print(client, 'Server: '+rand);
        }
    });

    client.on('end', () => console.log('Client '+client.id+' disconnected'));
});

server.listen(port, () => {
    console.log('Server listening on localhost:'+port);
});

function print(client,data) {
    client.log.write(data);
    console.log(data);
}