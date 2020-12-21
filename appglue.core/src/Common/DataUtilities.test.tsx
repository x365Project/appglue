import {XDataDefinition} from "./Data/XDataDefinition";
import {DataUtilities} from "./DataUtilities";
import {StringDataDefinition} from "./Data/Definitions/StringDataDefinition";

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

    it("Is Date", () => {
        let date = '2016-02-01T18:59:35.375Z'

        if (!DataUtilities.isDateString(date))
            throw 'should be date';

        if (DataUtilities.isDateString('carl'))
            throw 'should not be date';

    });

    it("Get Date", () => {
        let date = '2016-02-01T18:59:35.375Z'

        if (DataUtilities.getDateFromString(date).getFullYear() !== 2016)
            throw 'should be 2016';

        if (DataUtilities.getDateFromString(date).getMonth() !== 1)
            throw 'should be 1';

    });

    it("Object is Date", () => {
        let date = new Date(2016, 1, 2);

        if (!DataUtilities.isValidDate(date))
            throw 'should be date';

        let nonDate = {monthy: 12};

        if (DataUtilities.isValidDate(nonDate))
            throw 'should not be date';

    });


    it("Compare Object Structure", () => {
        let o1 = {
            d: 'data',
            d2: 'data2'
        }

        let o2 = {
            d: 'data',
            d2: 'data2'
        }

        if (!DataUtilities.compareObjectStructure(o1, o2))
            throw 'objects should compare';


        let o3 = {
            d: 'data'
        }

        // has additional elements... should be ok
        if (!DataUtilities.compareObjectStructure(o1, o3))
            throw 'objects should compare';

        // missing elements, not ok
        if (DataUtilities.compareObjectStructure(o3, o1))
            throw 'objects should not compare';

    });


})
