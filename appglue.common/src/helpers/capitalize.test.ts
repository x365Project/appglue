import {strictEqual} from 'assert';
import capitalize from './capitalize';

describe('capitalize', () => {
    it('should capitalize "test" to "Test"', () => {
        strictEqual(capitalize('test'), 'Test');
    })
});
