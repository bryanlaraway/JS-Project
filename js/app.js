//Functionality needed


var $title = $("#new-title");
var $noteText = $("#new-note");

var noteTitleInput = document.getElementById("new-title");
var noteTextInput = document.getElementById("new-note");
var saveButton = document.getElementById("save-button");
var completedNoteHolder = document.getElementById("saved-notes");


//Check for title
function isTitlePresent () {
    return $title.val().length > 0;
}

//Check for note text
function isNoteTextPresent () {
    return $noteText.val().length > 0;
}


function canSave() {
    return isTitlePresent() && isNoteTextPresent();
}

function canEdit() {
    return !isTitlePresent() && !isNoteTextPresent();
}

//NEW NOTES

//When clicking Save

var createNewNoteElement = function(titleString, noteString) {
    var noteItem = document.createElement("li");
    var title = document.createElement("label");
    var textAreaInput = document.createElement("textarea");
    var viewButton = document.createElement("button");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");


    title.innerText = titleString;
    textAreaInput.innerText = noteString;
    viewButton.innerText = "View";
    viewButton.className = "view";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";


    noteItem.appendChild(title);
    noteItem.appendChild(textAreaInput);
    noteItem.appendChild(viewButton);
    noteItem.appendChild(editButton);
    noteItem.appendChild(deleteButton);


    //If both are present
    //Move note to Note List
    //If both aren't present
    //Indicate with an alert what needs to be fixed

    return noteItem;
};

var saveNote = function(){
    if (canSave()) {
        var noteItem = createNewNoteElement(noteTitleInput.value, noteTextInput.value);
        completedNoteHolder.appendChild(noteItem);
        noteTitleInput.value = '';
        noteTextInput.value = '';
    } else {
        alert("Fill in note title and note text!");
    }
};

//EXISTING NOTES

//Hide text area for existing notes

//When clicking View
    //Check for presence of title/text in viewer
    //If no title/text present
        //Move selected note to main viewer
        //Remove selected note from Notes List

var viewNote = function() {

};


//When clicking Edit
//Check for presence of title/text in viewer
//If no title/text present
//Move selected note to main viewer
//Change viewer to edit mode
//Remove selected note from Notes List
var editNote = function(){
    if (canEdit()) {

    } else {
        alert("Save or delete your note first!")
    }

};

//When clicking Delete
//Remove line containing the note
var deleteNote = function() {
    var noteItem = this.parentNode;
    var ul = noteItem.parentNode;
    ul.removeChild(noteItem);
};








var bindNoteEvents = function(savedNote){
    var viewButton = savedNote.querySelector("button.view");
    var editButton = savedNote.querySelector("button.edit");
    var deleteButton = savedNote.querySelector("button.delete");
    viewButton.onclick = viewNote;
    editButton.onclick = editNote;
    deleteButton.onclick = deleteNote;
};

for(var i = 0; i < completedNoteHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
    bindNoteEvents(completedNoteHolder.children[i]);
}

//Set click handler to the createNewNote function
saveButton.onclick = saveNote;

