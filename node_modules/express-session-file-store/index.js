'use strict';

const path = require('path');
const fs = require('fs');

const expressSession = require('express-session');


const MyFileStore = function (directory) {
    this.directory = directory;
};

MyFileStore.prototype = Object.create(expressSession.Store.prototype);

MyFileStore.prototype.get = function (sessionID, callback) {
    let sessionFilePath = path.join(this.directory, sessionID);

    fs.readFile(sessionFilePath, 'utf8', function (err, data) {
        if (err) {
            return callback(err, null);    // If err.code === 'ENOENT', callback(err, null) acts like callback(null, null).
        } else {
            let session;

            try {
                session = JSON.parse(data);
            } catch (e) {
                return callback(e, null)
            }
            return callback(null, session);
        }
    });
};

MyFileStore.prototype.set = function (sessionID, session, callback) {
    let sessionFilePath = path.join(this.directory, sessionID);
    let data = JSON.stringify(session);

    fs.writeFile(sessionFilePath, data, 'utf8', function (err) {
        return callback(err);
    });
};

MyFileStore.prototype.destroy = function (sessionID, callback) {
    let sessionFilePath = path.join(this.directory, sessionID);

    fs.unlink(sessionFilePath, function (err) {
        return callback(err);
    });
};

module.exports = MyFileStore;