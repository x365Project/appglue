import {ValidationIssue} from "./IDesignValidationProvider";

export function validateVariableName(name: string) : ValidationIssue | null{

    if (name.indexOf(' ') !== -1)
        return new ValidationIssue('Name cannot contain a space');

    return null;
}