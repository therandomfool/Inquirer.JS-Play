const mockery = require('mockery');
const ReadlineStub = require('./helpers/readline');

mockery.enable();
mockery.warnOnUnregistered(false);
mockery.registerMock('readline', {
    createInterface: function () {
        return new ReadlineStub();
    },
});