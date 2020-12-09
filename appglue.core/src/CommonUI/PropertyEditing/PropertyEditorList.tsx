import React, {useState} from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
} from "@material-ui/core";
import styled from 'styled-components';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

const DialogContentWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;


export interface IPropertyEditorList{
    label: string;
    list: {name: string, item: any}[];
    desiredWidth?: number;
    desiredHeight?: number;
    showDialogCancel: boolean;
    itemUI: (item: any) => {
        onComplete: CallableFunction
        onCancel: CallableFunction
        ui: (JSX.Element | undefined)
    };
    prototype: () => any
}

export const PropertyEditorList : React.FC<IPropertyEditorList> = (props: IPropertyEditorList) => {

    const [selected, setSelected] = useState<{content: {name: string; item: any}, index: number, name: string} | null>(null)

    const {list, itemUI, showDialogCancel, prototype} = props;

    const onSelect = (item: {name: string, item: any}, index: number) => {

        if (list.length < index) {
            const newItem = prototype();
    
            Object.keys(item.item).forEach((k: string) => {
                Reflect.set(newItem, k, Reflect.get(item.item, k));
            });
            setSelected({
                content: newItem,
                index,
                name: item.name
            });
        } else {
            setSelected({
                content: item.item,
                index,
                name: item.name
            })
        }
    }

    const addNew = () => {
        let newObj = prototype();
        onSelect({item: newObj, name: 'New'}, list.length);
    }

    const onSave = () => {
        itemUI(selected).onComplete(selected);
        setSelected(null);
    }

    const onClose = () => {
        itemUI(selected).onCancel();
        setSelected(null);
    }
    
    return (
        <>
            { props.label && <Typography variant="h6">{props.label}</Typography>}
            <List>
                {
                    list.map((item, idx) => (
                        <ListItem key={idx}>
                            <ListItemText>
                                {`${item.name || `rows ${idx + 1}`} `}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton
                                    color="primary"
                                    size="small"
                                    onClick={() => onSelect(item, idx)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    size="small"
                                    onClick={() => {
                                        itemUI(item).onComplete({index: idx, content: null});
                                    }}
                                >
                                    <HighlightOffIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
            <Button color="primary" onClick={addNew}>Add</Button>
            {
                selected && (
                    <div onMouseDown={(e) => {e.stopPropagation()}}>
                        <Dialog open={!!selected.content} onClose={onClose}>
                            <DialogTitle disableTypography style={{justifyContent: 'space-between', display: 'flex'}}>
                                <Typography variant="h6">
                                    { selected && selected.name }
                                </Typography>
                                <IconButton onClick={onClose}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentWrapper>
                                {
                                    itemUI(selected).ui
                                }
                                </DialogContentWrapper>

                            </DialogContent>
                            <DialogActions>
                                {
                                    showDialogCancel && <Button onClick={onClose} variant="contained">Cancel</Button>
                                }
                                <Button color="primary" onClick={onSave} variant="contained">Save</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )
            }
            
        </>
    )
}