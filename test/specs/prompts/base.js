const expect = require('chai').expect;
const ReadlineStub = require('../../helpers/readline');

const Base = require('../../../lib/prompts/base');

describe('`base` prompt (e.g. prompt helpers)', function () {
    beforeEach(function () {
        this.rl = new ReadlineStub();
        this.base = new Base(
            {
                message: 'foo bar',
                name: 'name',
            },
            this.rl
        );
    });

    it('should not point by reference to the entry `question` object', function () {
        const question = {
            message: 'foo bar',
            name: 'name',
        };
        const base = new Base(question, this.rl);
        expect(question).to.not.equal(base.opt);
        expect(question.name).to.equal(base.opt.name);
        expect(question.message).to.equal(base.opt.message);
    });
});