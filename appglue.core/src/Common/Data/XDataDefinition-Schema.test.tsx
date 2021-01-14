import {XDataDefinition} from "./XDataDefinition";
import {DateDataDefinition} from "./Definitions/DateDataDefinition";
import {StringDataDefinition} from "./Definitions/StringDataDefinition";
import {XFormDataEditing} from "../../Form/Components/XFormDataEditing";
import {NumberDataDefinition} from "./Definitions/NumberDataDefinition";

// {
//     "firstName": "John",
//     "lastName": "Doe",
//     "age": 21
// }
const basicschema = `
{
  "$id": "https://example.com/person.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "description": "The person's first name."
    },
    "lastName": {
      "type": "string",
      "description": "The person's last name."
    },
    "age": {
      "description": "Age in years which must be equal to or greater than zero.",
      "type": "integer",
      "minimum": 0
    },
    "isMale": {
      "type": "boolean",
      "description": "gender of person."
    }
  }
}
`

// {
//     "phoneNumber": "555-1212",
// }
const patternSchema = `
{
  "$id": "https://example.com/person.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "phoneNumber": {
      "type": "string",
      "pattern": "^(\\\\([0-9]{3}\\\\))?[0-9]{3}-[0-9]{4}$",
      "description": "The person's first name."
    }
  }
}
`

// {
//     "latitude": 48.858093,
//     "longitude": 2.294694
// }

const minMaxSchema = `
{
  "$id": "https://example.com/geographical-location.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Longitude and Latitude Values",
  "description": "A geographical coordinate.",
  "required": [ "latitude", "longitude" ],
  "type": "object",
  "properties": {
    "latitude": {
      "type": "number",
      "minimum": -90,
      "maximum": 90
    },
    "longitude": {
      "type": "number",
      "minimum": -180,
      "maximum": 180
    }
  }
}
`

// {
//     "fruits": [ "apple", "orange", "pear" ],
//     "vegetables": [
//     {
//         "veggieName": "potato",
//         "veggieLike": true
//     },
//     {
//         "veggieName": "broccoli",
//         "veggieLike": false
//     }
// ]
// }

const arrayWithRef = `
{
  "$id": "https://example.com/arrays.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "A representation of a person, company, organization, or place",
  "type": "object",
  "properties": {
    "fruits": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "vegetables": {
      "type": "array",
      "items": { "$ref": "#/definitions/veggie" }
    }
  },
  "definitions": {
    "veggie": {
      "type": "object",
      "required": [ "veggieName", "veggieLike" ],
      "properties": {
        "veggieName": {
          "type": "string",
          "description": "The name of the vegetable."
        },
        "veggieLike": {
          "type": "boolean",
          "description": "Do I like this vegetable?"
        }
      }
    }
  }
}`

const fileSystemSchema = `
{
  "$id": "http://example.com/entry-schema",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "JSON Schema for an fstab entry",
  "type": "object",
  "required": [ "storage" ],
  "properties": {
    "storage": {
      "type": "object",
      "oneOf": [
        { "$ref": "#/definitions/diskDevice" },
        { "$ref": "#/definitions/diskUUID" },
        { "$ref": "#/definitions/nfs" },
        { "$ref": "#/definitions/tmpfs" }
      ]
    },
    "fstype": {
      "enum": [ "ext3", "ext4", "btrfs" ]
    },
    "options": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "string"
      },
      "uniqueItems": true
    },
    "readonly": {
      "type": "boolean"
    }
  },
  "definitions": {
    "diskDevice": {
      "properties": {
        "type": {
          "enum": [ "disk" ]
        },
        "device": {
          "type": "string",
          "pattern": "^/dev/[^/]+(/[^/]+)*$"
        }
      },
      "required": [ "type", "device" ],
      "additionalProperties": false
    },
    "diskUUID": {
      "properties": {
        "type": {
          "enum": [ "disk" ]
        },
        "label": {
          "type": "string",
          "pattern": "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"
        }
      },
      "required": [ "type", "label" ],
      "additionalProperties": false
    },
    "nfs": {
      "properties": {
        "type": { "enum": [ "nfs" ] },
        "remotePath": {
          "type": "string",
          "pattern": "^(/[^/]+)+$"
        },
        "server": {
          "type": "string",
          "oneOf": [
            { "format": "hostname" },
            { "format": "ipv4" },
            { "format": "ipv6" }
          ]
        }
      },
      "required": [ "type", "server", "remotePath" ],
      "additionalProperties": false
    },
    "tmpfs": {
      "properties": {
        "type": { "enum": [ "tmpfs" ] },
        "sizeInMB": {
          "type": "integer",
          "minimum": 16,
          "maximum": 512
        }
      },
      "required": [ "type", "sizeInMB" ],
      "additionalProperties": false
    }
  }
}
`

const allOfSchema = `
{
  "definitions": {
    "address": {
      "type": "object",
      "properties": {
        "street_address": { "type": "string" },
        "city":           { "type": "string" },
        "state":          { "type": "string" }
      },
      "required": ["street_address", "city", "state"]
    }
  },

  "allOf": [
    { "$ref": "#/definitions/address" },
    { "properties": {
        "type": { "enum": [ "residential", "business" ] }
      }
    }
  ],

  "additionalProperties": false
}`

const anyOfSchema = `
{
  "anyOf": [
    { "type": "string" },
    { "type": "number" }
  ]
}`

const oneOfSchema = `
{
  "oneOf": [
    { "type": "number", "multipleOf": 5 },
    { "type": "number", "multipleOf": 3 }
  ]
}
`

const notSchema = `{ "not": { "type": "string" } }`

describe("Data Definition - Schema", () => {


    it("Parse Basic Schema", () => {

        let def = new XDataDefinition();
        def.mergeJSONSchema(basicschema, false, true);

        // {
//     "firstName": "John",
//     "lastName": "Doe",
//     "age": 21
//     "isMale": true
// }

        if (def.fields.length !== 4)
            throw 'expected 4 fields';

        if (def.fields[0].name !== 'firstName')
            throw 'field name wrong - 1';

        if (def.fields[1].name !== 'lastName')
            throw 'field name wrong - 2';

        if (def.fields[2].name !== 'age')
            throw 'field name wrong - 3';

        if (def.fields[3].name !== 'isMale')
            throw 'field name wrong - 4';
    });

    it("Parse Pattern Schema", () => {

        let def = new XDataDefinition();
        def.mergeJSONSchema(patternSchema, false, true);

// {
//     "phoneNumber": "555-1212"
// }

        if (def.fields.length !== 1)
            throw 'expected 1 fields';

        if (def.fields[0].name !== 'phoneNumber')
            throw 'field name wrong - 1';

        let stringDef = def.fields[0] as StringDataDefinition;

        if (!stringDef)
            throw 'should be string def';

        if (!stringDef.pattern)
            throw 'should have pattern';
    });


    it("Parse Min Max", () => {

        let def = new XDataDefinition();
        def.mergeJSONSchema(minMaxSchema, false, true);

// {
//     "latitude": 48.858093,
//     "longitude": 2.294694
// }

        if (def.fields.length !== 2)
            throw 'expected 2 fields';

        if (def.fields[0].name !== 'latitude')
            throw 'field name wrong - 1';

        if (def.fields[1].name !== 'longitude')
            throw 'field name wrong - 2';

        let nDef = def.fields[0] as NumberDataDefinition;

        if (!nDef)
            throw 'should be number def'

        if (nDef.upperBounds !== 90)
            throw 'should be 90'

        if (nDef.lowerBounds !== -90)
            throw 'should be -90'

        if (nDef.allowDecimals !== true)
            throw 'should allow decimals'

    });


    it("Parse allOf", () => {

        let def = new XDataDefinition();

        try {
            def.mergeJSONSchema(allOfSchema, false, true);
            throw 'should not have gotten'
        } catch (error) {
            if (error === 'should not have gotten') {
                throw 'should to have worked.'
            }
        }

    });

    it("Parse anyOf", () => {

        let def = new XDataDefinition();

        try {
            def.mergeJSONSchema(anyOfSchema, false, true);
            throw 'should not have gotten'
        } catch (error) {
            if (error === 'should not have gotten') {
                throw 'should to have worked.'
            }
        }

    });

    it("Parse oneOf", () => {

        let def = new XDataDefinition();

        try {
            def.mergeJSONSchema(oneOfSchema, false, true);
            throw 'should not have gotten'
        } catch (error) {
            if (error === 'should not have gotten') {
                throw 'should to have worked.'
            }
        }

    });

    it("Parse not", () => {

        let def = new XDataDefinition();

        try {
            def.mergeJSONSchema(notSchema, false, true);
            throw 'should not have gotten'
        } catch (error) {
            if (error === 'should not have gotten') {
                throw 'should to have worked.'
            }
        }

    });

})
