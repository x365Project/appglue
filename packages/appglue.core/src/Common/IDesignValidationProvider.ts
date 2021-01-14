
export interface IDesignValidationProvider {
    getDesignValidationIssues() : ValidationIssue[];
}

export interface IRuntimeValidationProvider {
    getRuntimeValidationIssues() : ValidationIssue[];
}

export enum ValidationLevel {
    WARNING = 'warning',
    ERROR = 'error'
}

export class ValidationIssue {
    dataName?: string;
    elementId?: string;
    issue: string;
    level : ValidationLevel;


    constructor(issue: string, dataName?: string, elementId?: string, level: ValidationLevel = ValidationLevel.ERROR) {
        this.dataName = dataName;
        this.elementId = elementId;
        this.issue = issue;
        this.level = level;
    }
}

