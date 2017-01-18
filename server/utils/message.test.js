const {generateMessage} = require('./message');
const expect = require('expect');

describe('generateMessage', ()=> {
    it('should generate correct message object', () => {
        var from = 'BhavikJ';
        var text = 'yep this is it.';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});
