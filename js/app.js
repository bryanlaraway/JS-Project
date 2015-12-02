var $title = $("#new-title");
var $noteText = $("#new-note");
var placeHolderTitle = "Add title";
var placeHolderText = "Add note text";
var savedNoteTitle = '';
var savedNoteText = '';


var noteTitleInput = document.getElementById("new-title");
var noteTextInput = document.getElementById("new-note");
var saveButton = document.getElementById("save-button");
var completedNoteHolder = document.getElementById("saved-notes");

function isTitlePresent () {
    return $title.val().length > 0 && $title.val() != placeHolderTitle;
}

//Check for note text
function isNoteTextPresent () {
    return $noteText.val().length > 0 && $noteText.val() != placeHolderText;
}

function canSave() {
    return isTitlePresent() && isNoteTextPresent();
}

function canView() {
    return !isTitlePresent() && !isNoteTextPresent();
}

var createNewNoteElement = function(titleString, noteString) {
    var noteItem = document.createElement("li");
    var title = document.createElement("label");
    var textAreaInput = document.createElement("textarea");
    var viewButton = document.createElement("button");
    var deleteButton = document.createElement("button");

    title.innerText = titleString;
    textAreaInput.innerText = noteString;
    viewButton.innerText = "View";
    viewButton.className = "view";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    noteItem.appendChild(title);
    noteItem.appendChild(textAreaInput);
    noteItem.appendChild(viewButton);
    noteItem.appendChild(deleteButton);
    bindNoteEvents(noteItem);
    return noteItem;
};

var saveNote = function(){
    if (canSave()) {
        var noteItem = createNewNoteElement(noteTitleInput.value, noteTextInput.value);
        completedNoteHolder.appendChild(noteItem);
        noteTitleInput.value = placeHolderTitle;
        noteTextInput.value = placeHolderText;
    } else {
        alert("Fill in note title and note text!");
    }
};

var viewNote = function() {
    if (canSave()) {
        if (confirm('Do you want to save your current note?')) {
            saveNote();
        } else {
            noteTitleInput.value = placeHolderTitle;
            noteTextInput.value = placeHolderText;
        }
        moveNoteToEditor(this.parentNode);
    } else {
        moveNoteToEditor(this.parentNode);
    }
};

var deleteNote = function() {
    var noteItem = this.parentNode;
    var ul = noteItem.parentNode;
    ul.removeChild(noteItem);
};

var moveNoteToEditor = function(noteItem) {
    var ul = noteItem.parentNode;
    noteTitleInput.value = noteItem.childNodes[0].innerText;
    noteTextInput.value = noteItem.childNodes[1].innerText;
    var savedNoteTitle = noteItem.childNodes[0].innerText;
    var savedNoteText = noteItem.childNodes[1].innerText;
    ul.removeChild(noteItem);
};

var bindNoteEvents = function(savedNote){
    var viewButton = savedNote.querySelector("button.view");
    var deleteButton = savedNote.querySelector("button.delete");
    viewButton.onclick = viewNote;
    deleteButton.onclick = deleteNote;
};

for(var i = 0; i < completedNoteHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
    bindNoteEvents(completedNoteHolder.children[i]);
}

saveButton.onclick = saveNote;

