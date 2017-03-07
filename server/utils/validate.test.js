const expect = require('expect');
const {isRealString} = require('./validate');

describe('isRealString', () => {
  it('should reject Non String Values',()=> {
    var res = isRealString(98);
    expect(res).toBe(false);
  });
  it('should reject Strings with only Spaces', () => {
    var res = isRealString('    ');
    expect(res).toBe(false);
  });
  it('should allow String with Non Space Characters', () => {
    var res = isRealString('Yes, It is');
    expect(res).toBe(true);
  });
});
