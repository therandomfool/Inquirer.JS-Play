const stripAnsi = require('strip-ansi');
const expect = require('chai').expect;
const _ = require('lodash');
const ReadlineStub = require('../../helpers/readline');
const fixtures = require('../../helpers/fixtures');

const Password = require('../../../lib/prompts/password');

function testMasking(rl, mask) {
    return function (answer) {
        expect(answer).to.equal('Inquirer');
        const expectOutput = expect(stripAnsi(rl.output.__raw__));
        if (mask) {
            expectOutput.to.contain(mask);
        } else {
            expectOutput.to.not.contain('********');
        }
    };
}

describe('`password` prompt', function () {
    beforeEach(function () {
        this.fixture = _.clone(fixtures.password);
        this.rl = new ReadlineStub();
    });

    it('should use raw value from the user without masking', function () {
        const password = new Password(this.fixture, this.rl);
        const promise = password.run().then(testMasking(this.rl, false));

        this.rl.emit('line', 'Inquirer');
        return promise;
    });

    it('should mask the input with "*" if the `mask` option was provided by the user was `true`', function () {
        this.fixture.mask = true;
        const password = new Password(this.fixture, this.rl);
        const promise = password.run().then(testMasking(this.rl, '********'));

        this.rl.emit('line', 'Inquirer');
        return promise;
    });

    it('should mask the input if a `mask` string was provided by the user', function () {
        this.fixture.mask = '#';
        const password = new Password(this.fixture, this.rl);
        const promise = password.run().then(testMasking(this.rl, '########'));

        this.rl.emit('line', 'Inquirer');
        return promise;
    });

    it('Preserves default', function () {
        this.fixture.default = 'Inquirer';
        const password = new Password(this.fixture, this.rl);
        const promise = password.run().then((answer) => expect(answer).to.equal('Inquirer'));
        this.rl.emit('line', '');
        return promise;
    });

    it('Clears default on keypress', function () {
        this.fixture.default = 'Inquirer';
        const password = new Password(this.fixture, this.rl);
        const promise = password.run().then((answer) => expect(answer).to.equal(''));
        password.onKeypress({ name: 'backspace' });
        this.rl.emit('line', '');
        return promise;
    });
});
