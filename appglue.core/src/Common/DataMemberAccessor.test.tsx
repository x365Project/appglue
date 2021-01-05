import {XDataDefinition} from "./Data/XDataDefinition";
import {DataUtilities} from "./DataUtilities";
import {StringDataDefinition} from "./Data/Definitions/StringDataDefinition";

describe("Data Utilities", () => {


    it("PropertyGetTests", () => {
        let person = {
            firstName: 'carl',
            address : {
                city : 'chesapeake',
                priceHistory : [
                    {
                        date: '1/1/1',
                        price: 200,
                        buyer: [
                            'alice',
                            'jon'
                        ]
                    },
                    {
                        date: '1/1/2',
                        price: 300,
                        buyer: [
                            'mary',
                            'jim'
                        ]
                    }
                ]
            },
            otherNames : [
                'joe',
                'fred'
            ]
        }

        let name = DataUtilities.get(person, 'firstName');

        if (name !== 'carl')
            throw 'name should be carl'

        let city = DataUtilities.get(person, 'address.city');

        if (city !== 'chesapeake')
            throw 'city should be chesapeake'


        let firstPrice = DataUtilities.get(person, 'address.priceHistory[0].price');

        if (firstPrice !== 200)
            throw 'first price should be 200'

        firstPrice = DataUtilities.get(person, 'address.priceHistory[first].price');

        if (firstPrice !== 200)
            throw 'first price should be 200'

        let lastPrice = DataUtilities.get(person, 'address.priceHistory[1].price');

        if (lastPrice !== 300)
            throw 'last price should be 300'

        lastPrice = DataUtilities.get(person, 'address.priceHistory[last].price');

        if (lastPrice !== 300)
            throw 'last price should be 300'

        let allPrices = DataUtilities.get(person, 'address.priceHistory.price');

        if (!Array.isArray(allPrices)) {
            throw 'should be array'
        } else {
            if (allPrices.length !== 2) {
                throw 'should have 2 pieces '
            } else {
                if (allPrices[0] !== 200 || allPrices[1] !== 300) {
                    throw 'array pieces wrong '
                }
            }
        }

        allPrices = DataUtilities.get(person, 'address.priceHistory[all].price');

        if (!Array.isArray(allPrices)) {
            throw 'should be array - 2'
        } else {
            if (allPrices.length !== 2) {
                throw 'should have 2 pieces - 2'
            } else {
                if (allPrices[0] !== 200 || allPrices[1] !== 300) {
                    throw 'array pieces wrong - 2'
                }
            }
        }

        allPrices = DataUtilities.get(person, 'address.priceHistory[].price');

        if (!Array.isArray(allPrices)) {
            throw 'should be array - 3'
        } else {
            if (allPrices.length !== 2) {
                throw 'should have 2 pieces - 3'
            } else {
                if (allPrices[0] !== 200 || allPrices[1] !== 300) {
                    throw 'array pieces wrong - 3'
                }
            }
        }

        let otherNames = DataUtilities.get(person, 'otherNames');

        if (!Array.isArray(otherNames)) {
            throw 'should be array - other names'
        } else {
            if (otherNames.length !== 2) {
                throw 'should have 2 pieces - other names'
            } else {
                if (otherNames[0] !== 'joe' || otherNames[1] !== 'fred') {
                    throw 'array pieces wrong - other names'
                }
            }
        }

        let firstOtherName = DataUtilities.get(person, 'otherNames[0]');

        if (firstOtherName !== 'joe')
            throw 'first other name is wrong'


        let allBuyers = DataUtilities.get(person, 'address.priceHistory[].buyer')

        if (!Array.isArray(allBuyers)) {
            throw 'should be array - all buyers'
        } else {
            if (allBuyers.length !== 4) {
                throw 'should have 4 pieces - all buyers'
            } else {
                if (allBuyers[0] !== person.address.priceHistory[0].buyer[0] || allBuyers[3] !== person.address.priceHistory[1].buyer[1]) {
                    throw 'array pieces wrong - all buyers'
                }
            }
        }

        // test getting value from invalid property name

        let nonData = DataUtilities.get(person, 'nonexisting')

        if (nonData)
            throw 'should be missing';

        // test getting invalid array index
        try {
            let nonData2 = DataUtilities.get(person, 'address.priceHistory[2]')
            throw 'should not happen'
        } catch (e) {
            if (e === 'should not happen')
                throw 'should have thrown exception'
        }

    });

    it("PropertySetTests", () => {
        let person = {
            firstName: 'carl',
            address : {
                city : 'chesapeake',
                priceHistory : [
                    {
                        date: '1/1/1',
                        price: 200,
                        buyer: [
                            'alice',
                            'jon'
                        ]
                    },
                    {
                        date: '1/1/2',
                        price: 300,
                        buyer: [
                            'mary',
                            'jim'
                        ]
                    }
                ]
            },
            otherNames : [
                'joe',
                'fred'
            ]
        }

        // set simple
        DataUtilities.set(person, 'firstName', 'Heath');

        if (DataUtilities.get(person, 'firstName') !== 'Heath')
            throw 'simple set not working';

        // set address.city
        DataUtilities.set(person, 'address.city', 'Snowshoe');

        if (DataUtilities.get(person, 'address.city') !== 'Snowshoe')
            throw 'sub set not working';

        // set address.pricehistory[0].price
        DataUtilities.set(person, 'address.priceHistory[0].price', 5000);

        if (DataUtilities.get(person, 'address.priceHistory[0].price') !== 5000)
            throw 'set from inside array not working';

        // set array in val
        DataUtilities.set(person, 'otherNames[0]', 'Jason');

        if (DataUtilities.get(person, 'otherNames[0]') !== 'Jason')
            throw 'set array item not working';

        // 'add' keyword
        DataUtilities.set(person, 'otherNames[add]', 'Jim');

        let names = DataUtilities.get(person, 'otherNames');
        if (Array.isArray(names)) {
            if (names.length !== 3)
                throw 'add did not work ';
            if (names[2] !== 'Jim')
                throw 'add did not work - wrong value';
        } else {
            throw 'not array'
        }

        // 'addfirst' keyword
        DataUtilities.set(person, 'otherNames[addfirst]', 'JimOne');

        names = DataUtilities.get(person, 'otherNames');
        if (Array.isArray(names)) {
            if (names.length !== 4)
                throw 'add first did not work ';
            if (names[0] !== 'JimOne')
                throw 'add first did not work - wrong value';
        } else {
            throw 'not array'
        }

        // set to null
        DataUtilities.set(person, 'address', undefined);
        if (DataUtilities.get(person, 'address'))
            throw 'address should be null'

        if (DataUtilities.get(person, 'address.city'))
            throw 'city should be null'


        // should silently fail
        DataUtilities.set(person, 'address.city', 'norfolk', false);

        // set to missing
        try {
            DataUtilities.set(person, 'address.city', 'norfolk');
            throw 'should not get here'
        } catch (e) {
            if (e === 'should not get here')
                throw 'set should not work'
        }


        // set to index after last
        try {
            DataUtilities.set(person, 'otherNames[5]', 'hmm');
            throw 'should not get here'
        } catch (e) {
            if (e === 'should not get here')
                throw 'set should not work - past end'
        }

        // set to first
        DataUtilities.set(person, 'otherNames[first]', 'firstName');
        if (DataUtilities.get(person, 'otherNames[first]') !== 'firstName')
            throw 'last name should be firstName'

        // set to last
        DataUtilities.set(person, 'otherNames[last]', 'firstName');
        if (DataUtilities.get(person, 'otherNames[last]') !== 'firstName')
            throw 'last name should be firstName'


        // reset data type
        person = {
            firstName: 'carl',
            address : {
                city : 'chesapeake',
                priceHistory : [
                    {
                        date: '1/1/1',
                        price: 200,
                        buyer: [
                            'alice',
                            'jon'
                        ]
                    },
                    {
                        date: '1/1/2',
                        price: 300,
                        buyer: [
                            'mary',
                            'jim'
                        ]
                    }
                ]
            },
            otherNames : [
                'joe',
                'fred'
            ]
        }

        // try to set invalid type
        try {
            DataUtilities.set(person, 'otherNames', 'hmm');
            throw 'should not get here'
        } catch (e) {
            if (e === 'should not get here')
                throw 'set should not work - setting array to single value'
        }


        try {
            DataUtilities.set(person, 'address.priceHistory[0].price', 'some string');
            throw 'should not get here'
        } catch (e) {
            if (e === 'should not get here')
                throw 'number set to string'
        }

        try {
            DataUtilities.set(person, 'address.priceHistory[0]', 'some string');
            throw 'should not get here'
        } catch (e) {
            if (e === 'should not get here')
                throw 'setting object to string'
        }


        try {
            DataUtilities.set(person, 'address.priceHistory[0]', {invalid: true});
            throw 'should not get here'
        } catch (e) {
            if (e === 'should not get here')
                throw 'setting object to unrelated type - in array'
        }

        try {
            DataUtilities.set(person, 'address', {invalid: true});
            throw 'should not get here'
        } catch (e) {
            if (e === 'should not get here')
                throw 'setting object to unrelated type - as property'
        }

        // this should work
        DataUtilities.set(person, 'firstName', 20);

        if (DataUtilities.get(person, 'firstName') !== '20')
            throw 'should be converted to string because property was a string'


    });


})
