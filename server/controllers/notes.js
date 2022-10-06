const ObjectId = require('mongoose').Types.ObjectId;
const Note = require('../DataBase/Model/Note');
const Code = require('../DataBase/Model/Code');
const { isAdmin, isGuest } = require('../DataBase/database');

// every req will have user (i.e. userID) and username due to authProvider middleware
// if user is undefined that means user is not logged in and username will be guest

// ObjectID Validator function
function isValidObjectId(id) {
    return (ObjectId.isValid(id) && ((String)(new ObjectId(id)) === id))
}

// gets all notes (global and public) but private notes only which belong to user
const getAllNotes = async (req, res) => {
    const isAdminMode = (isAdmin(req.username) && (req.query.admin === 'true'));
    try {
        const filter = isAdminMode ? {} : {
            "$or": [
                { access: { "$in": ['global', 'public'] } },
                { access: 'private', username: req.username }
            ]
        };
        const notes = await Note.find(filter);
        res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

// gets code and language for a codeid
const getNote = async (req, res) => {
    try {
        const codeid = req.params.codeid;
        const noteid = req.query.noteid;
        if (!isValidObjectId(codeid) || !isValidObjectId(noteid))
            return res.status(404).json('not a valid object id');

        const code = await Code.findById(codeid);
        const note = await Note.findById(noteid);
        if (!code)
            return res.status(404).json('id does not exists');

        if ((note.access === 'private') && !isAdmin(req.username) && (code.user !== req.user)) // guest can't make private notes so no issues here
            return res.status(401).json("Unauthorized: private note can only be accessed by user who owns this note");

        return res.status(200).json(code);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

// add note & code to database
const addNote = async (req, res) => {
    try {
        const user = req.user;
        const username = req.username;
        let { title, desc, code, language, access, editable } = req.body;

        if (!title || !desc || !language || !access) {
            return res.status(400).json("title, description and access are required so please fill all !!!");
        }

        if ((isGuest(username)) || (!isAdmin(username) && access === 'global')) access = 'public';

        const newcode = new Code({ code, language, user });
        await newcode.save();
        const note = new Note({ title, desc, username, access, editable, codeid: newcode._id });
        await note.save();

        res.status(200).json(`Server : Note added to database, Note_id = ${note._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

// edits a note
const editNote = async (req, res) => {
    try {
        const username = req.username;
        const noteid = req.params.noteid;

        if (!isValidObjectId(noteid))
            return res.status(404).json('not a valid object id');

        let { title, desc, code, language, access, editable } = req.body;
        if (!title || !desc || !language || !access) {
            return res.status(400).json("title, description and access are required so please fill all !!!");
        }

        if ((isGuest(username)) || (!isAdmin(username) && access === 'global')) access = 'public';

        const note = await Note.findById(noteid);

        const isEditable = (isAdmin(username) || (note.access !== 'private' && note.editable) || (!isGuest(username) && (username === note.username)));
        if (!isEditable) return res.status(400).json("Unauthorized: You can't edit this note !");

        const codeDB = await Code.findById(note.codeid);

        note.title = title;
        note.desc = desc;
        note.access = access;
        note.editable = editable;
        note.lastModifiedAt = Date.now();

        codeDB.code = code;
        codeDB.language = language;

        await note.save();
        await codeDB.save();

        res.status(200).json(`Server : Note updated, Note_id = ${note._id} Code_id = ${codeDB._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

// deletes a note permanently
const deleteNote = async (req, res) => {
    try {
        const username = req.username;
        const noteid = req.params.noteid;

        if (!isValidObjectId(noteid))
            return res.status(404).json('not a valid object id');

        const note = await Note.findById(noteid);
        if (!note)
            return res.status(404).json("This note is already deleted or D.N.E. !");

        const codeid = note.codeid;

        if (!isAdmin(username)) {
            if (note.access === 'global')
                return res.status(401).json("Unauthorized: Not an Admin, Global Notes can only be deleted by Admin");

            if (isGuest(username))
                return res.status(401).json("Unauthorized: public notes by guest can only be deleted by admin !");

            if (note.username !== username)
                return res.status(401).json("Unauthorized: private note can only be accessed by user who owns this note");
        }

        await Note.deleteOne({ _id: noteid });
        await Code.deleteOne({ _id: codeid });

        res.status(200).json(`Server : Note delete successfully from database permanently !, Note_id = ${noteid}`);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getAllNotes,
    addNote,
    getNote,
    editNote,
    deleteNote
};