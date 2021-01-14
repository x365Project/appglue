import {XDataDefinition} from "./XDataDefinition";
import {DateDataDefinition} from "./Definitions/DateDataDefinition";
import {StringDataDefinition} from "./Definitions/StringDataDefinition";

describe("Data Definition", () => {


    it("Merge Object - Parse Simple Object", () => {

        let data = {
            firstName: 'carl',
            age: 50,
            isMale: true
        }

        let def = new XDataDefinition();
        def.mergeObject(data);

        if (def.fields.length !== 3)
            throw 'expected 3 fields';

        // check each field

        if (def.fields[0].name !== 'firstName')
            throw 'name not correct - 0'

        if (def.fields[1].name !== 'age')
            throw 'name not correct - 1'

        if (def.fields[2].name !== 'isMale')
            throw 'name not correct - 2'

        // check sample values
        let sampleObject = def.toSampleObject();

        if (Reflect.get(sampleObject, 'firstName') !== 'carl')
            throw 'value not correct - firstName';

        if (Reflect.get(sampleObject, 'age') !== 50)
            throw 'value not correct - age'

        if (Reflect.get(sampleObject, 'isMale') !== true)
            throw 'value not correct - isMale'

    });

    it("Merge Object - Parse Nested Object", () => {

        let data = {
            firstName: 'carl',
            age: 50,
            isMale: true,
            address : {
                address1: '100 main street',
                zip: 22000
            }
        }

        let def = new XDataDefinition();
        def.mergeObject(data);

        if (def.fields.length !== 4)
            throw 'expected 4 fields';

        // check each field

        if (def.fields[0].name !== 'firstName')
            throw 'name not correct - 0'

        if (def.fields[1].name !== 'age')
            throw 'name not correct - 1'

        if (def.fields[2].name !== 'isMale')
            throw 'name not correct - 2'

        if (def.fields[3].name !== 'address')
            throw 'name not correct - 3'

        // check sample values
        let sampleObject = def.toSampleObject();

        if (Reflect.get(sampleObject, 'firstName') !== 'carl')
            throw 'value not correct - firstName';

        if (Reflect.get(sampleObject, 'age') !== 50)
            throw 'value not correct - age'

        if (Reflect.get(sampleObject, 'isMale') !== true)
            throw 'value not correct - isMale'

        let add = Reflect.get(sampleObject, 'address');
        if (!add)
            throw 'value not correct - address'

        if (typeof add !== 'object')
            throw 'value not object - address'

        let zip = Reflect.get(add, 'zip');

        if (!zip)
            throw 'zip not found'

        if (zip !== 22000)
            throw 'zip wrong'

    });


    it("Merge Object - Parse Arrays Object", () => {

        let data = {
            firstName: ['carl', 'joe'],
            age: [50, 30],
            isMale: [true, false]
        }

        let def = new XDataDefinition();
        def.mergeObject(data);

        if (def.fields.length !== 3)
            throw 'expected 3 fields';

        // check each field

        if (def.fields[0].name !== 'firstName')
            throw 'name not correct - 0'

        if (def.fields[1].name !== 'age')
            throw 'name not correct - 1'

        if (def.fields[2].name !== 'isMale')
            throw 'name not correct - 2'

        if (def.fields[0].list !== true)
            throw 'name not correct - 0 - list'

        if (def.fields[1].list !== true)
            throw 'name not correct - 1 - list'

        if (def.fields[2].list !== true)
            throw 'name not correct - 2 - list'

        // check sample values
        let sampleObject = def.toSampleObject();

        if (!Array.isArray(Reflect.get(sampleObject, 'firstName')))
            throw 'should be array - firstName';

        if (!Array.isArray(Reflect.get(sampleObject, 'age')))
            throw 'should be array - age';

        if (!Array.isArray(Reflect.get(sampleObject, 'isMale')))
            throw 'should be array - isMale';

    });

    it("Merge Object - Reorder", () => {

        let data = {
            firstName: 'carl',
            age: 50,
            isMale: true
        }

        let def = new XDataDefinition();
        def.mergeObject(data);

        if (def.fields.length !== 3)
            throw 'expected 3 fields';

        // check each field

        if (def.fields[0].name !== 'firstName')
            throw 'name not correct - 0'

        if (def.fields[1].name !== 'age')
            throw 'name not correct - 1'

        if (def.fields[2].name !== 'isMale')
            throw 'name not correct - 2'

        let data2 = {
            firstName: 'carl2',
            age: 51,
            isMale: false
        }

        // do with same order
        def.mergeObject(data2, false, true);

        // should be in same order
        if (def.fields[0].name !== 'firstName')
            throw 'name not correct - 0'

        if (def.fields[1].name !== 'age')
            throw 'name not correct - 1'

        if (def.fields[2].name !== 'isMale')
            throw 'name not correct - 2'


        let data3 = {
            age: 51,
            firstName: 'carl2',
            isMale: false
        }

        // different order
        def.mergeObject(data3, false, true);

        // should be in same order
        // @ts-ignore
        if (def.fields[0].name !== 'age')
            throw 'name not correct after merge- 0'

        // @ts-ignore
        if (def.fields[1].name !== 'firstName')
            throw 'name not correct  after merge - 1'

        if (def.fields[2].name !== 'isMale')
            throw 'name not correct after merge - 2'



    });

    it("Merge Object - Remove Items Not In Object", () => {

        let data = {
            firstName: 'carl',
            age: 50,
            isMale: true
        }

        let def = new XDataDefinition();
        def.mergeObject(data);

        if (def.fields.length !== 3)
            throw 'expected 3 fields';

        // check each field

        if (def.fields[0].name !== 'firstName')
            throw 'name not correct - 0'

        if (def.fields[1].name !== 'age')
            throw 'name not correct - 1'

        if (def.fields[2].name !== 'isMale')
            throw 'name not correct - 2'

        let data2 = {
            firstName: 'carl2',
            age: 51
        }

        // do with same order
        def.mergeObject(data2, true, true);


        // @ts-ignore
        if (def.fields.length !== 2)
            throw 'should only have 2 fields'

        // should be in same order
        if (def.fields[0].name !== 'firstName')
            throw 'name not correct - 0'

        if (def.fields[1].name !== 'age')
            throw 'name not correct - 1'


        let data3 = {
            age: 51
        }

        // different order
        def.mergeObject(data3, true, false);

        // @ts-ignore
        if (def.fields.length !== 1)
            throw 'should only have 2 fields'

        // should be in same order
        // @ts-ignore
        if (def.fields[0].name !== 'age')
            throw 'name not correct - 1'



    });


    it("Merge Object - Ensure Other Data Elements Preserved", () => {

        let data = {
            firstName: 'carl',
            age: 50,
            isMale: true
        }

        let def = new XDataDefinition();
        def.mergeObject(data);

        if (def.fields.length !== 3)
            throw 'expected 3 fields';

        // check each field

        if (def.fields[0].name !== 'firstName')
            throw 'name not correct - 0';

        (def.fields[0] as StringDataDefinition).validValues = ['a', 'b'];

        let data2 = {
            firstName: 'carl2',
            age: 51,
            isMale: false
        }

        // do with same order
        def.mergeObject(data2, false, true);

        // should be in same order
        if (def.fields[0].name !== 'firstName')
            throw 'name not correct - 0'

        if ((def.fields[0] as StringDataDefinition).validValues.length !== 2)
            throw 'other data is lost'

    });

    it("Merge Object - Parse Date", () => {

        let data = {
            firstName: 'carl',
            age: 50,
            birthDay : new Date(1970,1,1)
        }

        let def = new XDataDefinition();
        def.mergeObject(data);

        if (def.fields.length !== 3)
            throw 'expected 3 fields';

        // check each field

        if (def.fields[0].name !== 'firstName')
            throw 'name not correct - 0'

        if (def.fields[1].name !== 'age')
            throw 'name not correct - 1'

        if (def.fields[2].name !== 'birthDay')
            throw 'name not correct - 2'

        let dateField = def.fields[2] as DateDataDefinition;

        if (!dateField)
            throw 'should be date field'

        if (!(dateField.getValue() instanceof Date)) {
            throw 'value should be a date'
        }

        if ((dateField.getValue() as Date).getFullYear() !== 1970)
            throw 'should be 1970'

    });

    it("Merge Object - Parse Date from JSON", () => {

        let data = {
            firstName: 'carl',
            age: 50,
            birthDay : new Date(1970,1,1)
        }

        let def = new XDataDefinition();

        def.mergeJSON(JSON.stringify(data));

        if (def.fields.length !== 3)
            throw 'expected 3 fields';

        // check each field

        if (def.fields[0].name !== 'firstName')
            throw 'name not correct - 0'

        if (def.fields[1].name !== 'age')
            throw 'name not correct - 1'

        if (def.fields[2].name !== 'birthDay')
            throw 'name not correct - 2'

        let dateField = def.fields[2] as DateDataDefinition;

        if (!dateField)
            throw 'should be date field'

        // check value
        if ((dateField.getValue() as Date).getFullYear() !== 1970)
            throw 'should be 1970'

    });


})
