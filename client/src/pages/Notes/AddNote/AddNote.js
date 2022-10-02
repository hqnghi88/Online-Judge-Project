import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import Note from '../Note/Note';
import { useSelector } from 'react-redux';
import CodeEditorv3 from '../../Question/Editor/CodeEditorv3';


const AddNote = ({ openModal, setOpenModal }) => {

    const { username } = useSelector(state => state.auth);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [access, setAccess] = useState('public');
    const [editable, setEditable] = useState(false);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp');

    const resetStates = () => {
        setTitle('');
        setDesc('');
        setAccess('public');
        setEditable(false);
        setCode('');
    }

    const handleClose = () => {
        resetStates();
        setOpenModal(false);
    };

    const handleAdd = () => {
        handleClose(false);
        // send request to server to add note with given info and credentials
    }

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (openModal) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openModal]);

    return (
        <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            scroll='paper'
            aria-labelledby="Add-Note"
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle style={{ textTransform: 'capitalize' }}>Add Note</DialogTitle>
            <DialogContent dividers ref={descriptionElementRef}>
                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-0.8rem', left: '0', fontWeight: 600, opacity: 0.6 }}>Preview :</span>
                    <Note note={{ title, desc, access, editable, username }} />
                </div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mb: 1.3, width: '85%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        required
                        id="title-textarea"
                        label="Title"
                        placeholder="Write max 20 characters"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <TextField
                        id="desc-textarea"
                        label="Description"
                        placeholder="Write max 200 characters"
                        multiline
                        value={desc}
                        onChange={event => setDesc(event.target.value)}
                    />
                    <FormControl sx={{ width: '85%' }}>
                        <InputLabel id="access-input-label">Access</InputLabel>
                        <Select
                            labelId="access-input-label"
                            id="access-input"
                            label="Access"
                            value={access}
                            onChange={event => setAccess(event.target.value)}
                        >
                            {username === 'aman' && <MenuItem value='global'>Global</MenuItem>}
                            <MenuItem value='public'>Public</MenuItem>
                            <MenuItem value='private'>Private</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        label="Editable (By Anyone)"
                        control={<CustomSwitch checked={editable} onChange={event => setEditable(event.target.checked)} />}
                        labelPlacement='start'
                    />
                    <span style={{ marginLeft: '0.9rem', fontWeight: 600, opacity: 0.6 }}>{editable ? "Yes" : "No"} </span>

                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <div style={{ fontWeight: 600, fontSize: '1.1rem', opacity: 0.7 }}>Enter Code : </div>
                        <FormControl>
                            <InputLabel id="changeLang-select-label">Language</InputLabel>
                            <Select
                                labelId="changeLang-select-label"
                                id="changeLang-select"
                                value={language}
                                label="Language"
                                style={{ width: '8em', height: '2.5em' }}
                                onChange={e => setLanguage(e.target.value)}
                            >
                                <MenuItem value={'c'}>C</MenuItem>
                                <MenuItem value={'cpp'}>Cpp</MenuItem>
                                <MenuItem value={'py'}>Python</MenuItem>
                                <MenuItem value={'java'}>JAVA</MenuItem>
                                <MenuItem value={'js'}>JS</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <CodeEditorv3
                        code={code}
                        setCode={setCode}
                        language={language}
                        fontSize={13}
                    />
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleAdd}>Add</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog >
    );
}

const CustomSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

export default AddNote;
