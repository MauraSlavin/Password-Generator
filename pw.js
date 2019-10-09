/* only do anything if a button is clicked. */
/* declare & initialize global variables */

/* possible characters to choose from, by character type. Order: Special, number, Uppercase, lowercase */
var possibleCharacters = [
    ["!", "#", "$", "%", "&", "(", ")", "*", "+", "-", "/", ":", ";", "<", "=", ">", "?", "@", "^", "_", "`", "{", "|", "}", "~"], /* spec chars */
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], /* numbers */
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], /* uppercase */
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] /* lowercase */
   ] 

/* number of character types (for looping through each ). */
   var numCharTypes = possibleCharacters.length;

/* variables needed to ask the user what requirements they want */
/* length of password  */
var pwLength = 0;  
/* assume none of the character types are required to begin with. */
var requiredBooleans = [false, false, false, false]; /* SpecChar, #s, UpperCase, LowerCase */
/* verbiage for each character type, in order */
var requireQuestions = ["special character", "number", "uppercase letter", "lowercase letter"];

/* number of each character type to include in password.  Will be 0 if not wanted.  Sum of elements should = pwLength */
var numEachCharType = [0, 0, 0, 0];
/* indicies into password for each of the character types.  Total number of indicies should = pwLength */
var indiciesForEachCharType = [ [], [], [], []];

/* initialize password to be generated */
var password = null;
/* pwCharLeft keeps track of how many characters are left to work with */
// var pwCharLeft = pwLength;



/* executed when "Generate PW" button is clicked */
/* generates pw */

function getPW() {
    pwLength = getLength();     /* ask & verify length of password desired */
/* getRequirements changes requiredBooleans */
    getRequirements();          /* ask user which requirements they want, validate input, reprompt if needed */
    getNumberOfEachType();      /* randomly determine how many of each REQUESTED char type will be generated (0 if not requested as a placeholder) */

/* for testing - how many of each char type will be generated */
    for (var i = 0; i < numCharTypes; i++) {
        console.log(requireQuestions[i] + ": " + numEachCharType[i]);
    }

/* generate the indicies into password for each char type.  */
    for (var i = 0; i < numCharTypes; i++) {
        if (numEachCharType[i]>0) {
            indiciesForEachCharType[i] =  generateIndices(numEachCharType[i],i);
        }
    }   

    alert("(test) indicies generated:  " + indiciesForEachCharType);

    password = assignPW();

/* put pw on website */
    securepw.textContent = password;
/* change formatting */
    securepw.style.color = "blue";
    securepw.style.weight = "700";
}  /* of fcn getPW */




/* prompts user for length of password; validates input, reprompting as needed. */

function getLength() {
    var length = 0;  /* defines length and ensures while loop runs at least once */
    while (length < 8 || length > 128) {    /* will continue to ask if length is not a valid number */
    
        length = prompt("How many characters would you like in your password?\nPlease enter a number between 8 and 128.");

    /* re-prompt if user entered something that is not a number */
        if (isNaN(length)) {    
            alert('You must enter a number.\nYou entered "' + length + '".');
            length = 0;  /* to continue while loop */
        }

    /* re-prompt if user entered a number less than 8 */
        else if (length < 8) {
            alert("You must enter a number greater than 8.\nYou entered " + length + ".");
        }

    /* re-prompt if user entered a number greater than 128 */
        else if (length > 128) {
            alert("You must enter a number less than 128.\nYou entered " + length + ".");
        }
    }  /* end of while loop */

/* we have a valid entry for the length of the password! */
return length = parseInt(length);  /* make length a number datatype  and returns it */
}  /* end of function getLength */



/* prompts for which required characters are desired, reprompting as needed. */

function getRequirements() {
    var choice = null;
 
    for (var i = 0; i < numCharTypes; i++) {
        requiredBooleans[i] = confirm("Would you like at least one " + requireQuestions[i] + "?");
    }

    while (!(requiredBooleans[0] || requiredBooleans[1] || requiredBooleans[2] || requiredBooleans[3])) {
        choice = prompt("You must choose at least one of the following:\n1: A special character\n2: A number\n3: An uppercase letter, or\n4: a lowercase letter.\nPlease enter the corresponding number.");
/* check input - must be 1, 2, 3 or 4.  If not, re-prompt */
/* re-prompt if choice entered is not a number */
        if (isNaN(choice)) {
            alert("You entered " + choice + ", which is not a number.\nPlease enter a number between 1 and 4 on the next prompt.");
        }
/* re-prompt if choice entered is less than 1 */        
        else if (choice < 1) {
            alert("You entered " + choice + ", which is less than 1.\nPlease enter a number between 1 and 4 on the next promp.");
        }

/* re-prompt if choice entered is greater than 4 */        
        else if (choice > 4) {
            alert("You entered " + choice + ", which is greater than 4.\nPlease enter a number between 1 and 4 on the next prompt.");
        }

/* choice is valid; change corresponding character type to true (required) */   
        else {
            requiredBooleans[choice] = true;
        }
    } /* of while loop */

}  /* end of function getRequirements  */



/* randomly generate the number of each type of character, including at least one of each type requested. */

function getNumberOfEachType() {
    var lengthLeft = pwLength;   /*  lengthLeft keeps track of how many characters are left to distribute among remaining types */
    /* numTypes used to leave at least one character for all required types */
    var numTypes = 0;
    for (var i = 0; i < numCharTypes; i++) {
        numTypes = numTypes + requiredBooleans[i];
    }

/* Generate the number of each character type */
    for (var i = 0; i < numCharTypes; i++) {  


        if (requiredBooleans[i]) {
            numTypes--;   /* used to leave at least one character for each of the remaining required types of characters */
            if (numTypes == 0) {  /* if this is the last type left, all the remaining types need to be the current type */
                numEachCharType[i] = lengthLeft;
                lengthLeft = 0;
            }  /* of if */
            else {      /* generate a number between 1 and the max number of Spec Characters needed */
                numEachCharType[i] = Math.floor(Math.random() * (lengthLeft - numTypes)) + 1;
                lengthLeft = lengthLeft - numEachCharType[i];  /* lengthLeft is the number of characters of other types remaining */
            }  /* of else */
        }  /* of if requireSpecCharacter */
    } /* of for loop */

}  /* of getNumberOfEachType function */



/* numIndiciesNeeded is the number of characters of the current character type; */
/* charType: 0 for Special char, 1 - numbers, 2- UPper case, 3 - lower case */

function generateIndices(numIndiciesNeeded, charType) {
    var allIndicies = [];

    for (var i = 0; i < possibleCharacters[charType].length; i++) {
        allIndicies.push(i);
        // alert(i + " (i):  allIndicies:  " + allIndicies);
    }

    allIndicies = shuffle(allIndicies);

    indicies = [];
    for (var i = 0; i < numIndiciesNeeded; i++) {
        indicies.push(allIndicies[i]);
    }

    return indicies;
} /* end of function generateIndicies */




/* scrambles the order of elements in an array.  Used to mix up where the characters are placed for each char type. */

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
// swap elements array[i] and array[j]
// we use "destructuring assignment" syntax to achieve that
// you'll find more details about that syntax in later chapters
// same can be written as:
// let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }  /* of for loop */
return array;
}  /* of shuffle fcn */



/* needs to be revised!!!  */

function assignPW() {
    var pw = [];

    /* get characters to be used, by character type */
    for (var i = 0; i < numCharTypes; i++) {
        for (var j = 0; j < indiciesForEachCharType[i].length; j++) {
            pw.push(possibleCharacters[i][j]);
        }
    }  /* of assignPW fcn */

    pw = shuffle(pw);
    alert(pw);

    /* make into a string */
    pw = pw.join('');
    alert(pw);

    return pw;
}   /* of assignPW function */



/* executes when "Copy to Clipboard" button is clicked */

function copyToClipboard() {

/* Overwrite what is being copied to the clipboard. */

/* need textarea for system to allow you to write to the system clipboard.  */
    var textarea = document.createElement("textarea");
    textarea.textContent = password;
  
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
        return document.execCommand("cut");
    }  /* of try */
    catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return false;
    }  /* of catch */
    finally {
        document.body.removeChild(textarea);
    } /* of "finally" */
}   /* of function copyToClipboard */