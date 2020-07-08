import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const NewCategoryDialog = ({isOpen, categoryCallback}) =>  {
    const [newCat, setNewCat] = useState('')

    const handleClose = () => {
        categoryCallback('')
    };
    const handleSaveCategory = () => {
        categoryCallback(newCat)
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Hier bitte die neue Kategorie eintragen
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="categoryField"
                        label="Kategorie"
                        type="text"
                        value={newCat}
                        fullWidth
                        onChange={(event => setNewCat(event.target.value))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Abbrechen
                    </Button>
                    <Button onClick={handleSaveCategory} color="primary">
                        Eintragen
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}