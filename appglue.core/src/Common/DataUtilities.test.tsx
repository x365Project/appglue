import {XDataDefinition} from "./Data/XDataDefinition";
import {DataUtilities} from "./DataUtilities";

describe("Data Utilities", () => {


    it("Object Compare", () => {

        let data = {
            firstName: 'carl',
            age: 50,
            isMale: true
        }

        let data2 = {
            firstName: 'carl',
            age: 50
        }

        if (!DataUtilities.compareObjectStructure(data, data2))
            throw 'objects should compare'

        if (DataUtilities.compareObjectStructure(data2, data))
            throw 'objects not should compare'

    });
})
