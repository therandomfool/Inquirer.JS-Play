const expect = require('chai').expect;
const stripAnsi = require('strip-ansi');

const Separator = require('../../../lib/objects/separator');
const Inquirer = require('../../../lib/inquirer');

describe('Separator constructor', function () {
    it('should set a default', function () {
        const sep = new Separator();
        expect(stripAnsi(sep.toString())).to.equal('──────────────');
    });

    it('should set user input as separator', function () {
        const sep = new Separator('foo bar');
        expect(stripAnsi(sep.toString())).to.equal('foo bar');
    });

    it('instances should be stringified when appended to a string', function () {
        const sep = new Separator('foo bar');
        expect(stripAnsi(String(sep))).to.equal('foo bar');
    });

    it('should be exposed on Inquirer object', function () {
        expect(Inquirer.Separator).to.equal(Separator);
    });

    it('should expose a helper function to check for separator', function () {
        expect(Separator.exclude({})).to.equal(true);
        expect(Separator.exclude(new Separator())).to.equal(false);
    });

    it("give the type 'separator' to its object", function () {
        const sep = new Separator();
        expect(sep.type).to.equal('separator');
    });
});