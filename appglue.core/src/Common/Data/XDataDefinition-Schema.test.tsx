import {XDataDefinition} from "./XDataDefinition";
import {DateDataDefinition} from "./Definitions/DateDataDefinition";
import {StringDataDefinition} from "./Definitions/StringDataDefinition";
import {XFormDataEditing} from "../../Form/Components/XFormDataEditing";

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
// }

        if (def.fields.length !== 3)
            throw 'expected 3 fields';

        if (def.fields[0].name !== 'firstName')
            throw 'field name wrong - 1';

        if (def.fields[1].name !== 'lastName')
            throw 'field name wrong - 2';

        if (def.fields[2].name !== 'age')
            throw 'field name wrong - 3';
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
