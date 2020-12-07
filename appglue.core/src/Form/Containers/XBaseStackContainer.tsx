import {XBaseContainer} from "./XBaseContainer";
import {IConfigStorage} from "../../Common/IConfigStorage";
import {XBaseControl} from "../Controls/XBaseControl";
import {DataUtilities} from "../../Common/DataUtilities";
import styled from "styled-components";
import {UIControlRegistration} from "../Utilities/RegisterUIControl";


export const OverlapDiv = styled("div")<{selected?: boolean, border?: string}>`
    background: transparent;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 100;
    filter: alpha(opacity = 0);
    border: ${props => props.selected && props.border ? props.border : 'none'};
    border-radius: 2px;
    cursor: initial;
`

export abstract class XBaseStackContainer
    extends XBaseContainer
    implements IConfigStorage {

    protected controls: XBaseControl[] = [];

    innerMargin? : number;
    interControlSpacing? : number;

    add(control: XBaseControl, index?: number) {
        // set control order
        if (index === undefined || index === null) {
            this.controls.push(control);
        } else {
            this.controls.splice(index, 0, control)
        }

        if (this.getFormContext())
            control.setFormContext(this.getFormContext()!) ;
    }

    remove(control: XBaseControl): void {
        const index = this.controls.indexOf(control, 0);
        if (index > -1) {
            this.controls.splice(index, 1);
        }
    }

    setOrder(id: string, order: number) {
        let controlToMove: XBaseControl | undefined;
        for (let c of this.controls) {
            if (c.id === id) {
                controlToMove = c;
            }
        }

        if (controlToMove) {
            this.remove(controlToMove);
            this.add(controlToMove, order);
        }
    }

    find(id: string): XBaseControl | null {
        if (Array.isArray(this.controls))
        {
            for (let c of this.controls) {
                if (c.id === id) {
                    return c;
                }
    
                if (c instanceof XBaseContainer) {
                    let found = (c as XBaseContainer).find(id);
    
                    if (found)
                        return found;
                }
            }
    
        }
        return null;
    }


    getControls(): XBaseControl[] {
        return this.controls;
    }

    getStorageData(): object {
        let retData = DataUtilities.cloneWithoutReact(this, ['container', 'form', 'controls', '_formContext']);
        Reflect.set(retData, '__controls', this.controls.map(c => {
            return c.getStorageData()
        }));
        return retData;
    }

    setStorageData(data: object): void {
        DataUtilities.spreadData(this, data, ['__controls']);

        let controlArray = Reflect.get(data, '__controls');
        if (controlArray && controlArray instanceof Array && controlArray.length !== 0) {
            for (let controlData of controlArray) {
                let typeName = Reflect.get(controlData, '__type');

                if (typeName) {
                    let registeredControl = UIControlRegistration[typeName];
                    let val = new registeredControl.prototype.constructor();
                    // @ts-ignore
                    let cc = val as XBaseControl;

                    if (this.getFormContext())
                        cc.setFormContext(this.getFormContext()) ;

                    cc.setStorageData(controlData);
                    this.controls.push(cc);
                }

            }
        }

    }

    getInnerMargin(): number | undefined {
        return this.innerMargin || this.getFormContext()?.form?.defaultInnerContainerMargin
    }

}