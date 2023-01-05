const EventEmitter = require('events');

class Logger extends EventEmitter {

    logemitter(arg){
        this.emit('log', arg);
    }

    userlog() {
        this.on('log', (arg) => {
            console.log(`${arg['id']} logged on the server using port ${arg['port']}`);
        });
    }
};

module.exports = Logger;
