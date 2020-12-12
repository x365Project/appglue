// todo: need better solution to this.  maybe we could auto build it.

import {ExistsExpression} from "./ExpressionElements/Logic/Exists";
import {GreaterThanExpression} from "./ExpressionElements/Logic/GreaterThan";
import {GreaterThanEqualToExpression} from "./ExpressionElements/Logic/GreaterThanEqualTo";
import {AndGroup, OrGroup} from "./ExpressionElements/Logic/Grouping";
import {IsFalseExpression} from "./ExpressionElements/Logic/IsFalse";
import {IsTrueExpression} from "./ExpressionElements/Logic/IsTrue";
import {LessThanExpression} from "./ExpressionElements/Logic/LessThan";
import {LessThanEqualToExpression} from "./ExpressionElements/Logic/LessThanEqualTo";


export function doRegister() : void {}