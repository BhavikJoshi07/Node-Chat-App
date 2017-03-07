const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id : '1',
      name : 'Smit',
      room : '4R'
    },{
      id : '2',
      name : 'Mayank',
      room : '4M'
    },{
      id : '3',
      name : 'Bhavik',
      room : '4R'
    },{
      id : '4',
      name : 'Ishan',
      room : '4M'
    }];
  });
  it('should add a new user', () => {
    var users = new Users();
    var user = {
      id : '1223',
      name : 'Bhavik',
      room : 'Pokemons'
    };
    var resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for 4R', () => {
    var userList = users.userList('4R');
    expect(userList).toEqual(['Smit','Bhavik']);
  });

  it('should return names for 4M', () => {
    var userList = users.userList('4M');
    expect(userList).toEqual(['Mayank','Ishan']);
  });

  it('should return a user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not return a user', () => {
    var userId = '5';
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });

  it('should remove a user', () => {
    var userId = '2';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(3);
  });

  it('should not remove a user', () => {
    var userId = '5';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(4);
  });
});
