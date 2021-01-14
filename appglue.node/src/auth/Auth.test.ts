import Auth from './Auth';

describe('Auth', () => {
    it('should login', () => {
        (new Auth).login();
    });
});
