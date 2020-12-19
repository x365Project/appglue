import React from "react";
import {XDataDefinition} from "./XDataDefinition";

describe("XData", () => {


    it("Parse Simple Object", () => {

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

//        expect().toHaveLength(0);

    });
})
