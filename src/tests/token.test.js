import assert from 'assert';
import genToken from '../helpers/auth';

describe('Token Tests ', () => {
  const user = {
    id: 1,
    email: 'justinemsinda@gnail.com',
    role: 'admin'
  };
  it('Check if token is being generated', () => {
    assert.isString(genToken(user));
  });

  // it('should get return 0  if Amount paid is greater than balance', () => {
  //   assert.equal(0, helper.balance(1000, 2000));
  // });
});
