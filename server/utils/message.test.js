const {generateMessage, generateLocationMessage} = require('./message');
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

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var latitude = 16;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=16,19';
        var locationMessage = generateLocationMessage(from,16,19);

        expect(locationMessage.createdAt).toBeA('number');
        expect(locationMessage).toInclude({from,url});
    });
});