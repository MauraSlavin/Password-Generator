# Password-Generator
Generates a random password, 8-128 characters, with at least one of each of the character types: special character, number, lowercase, uppercase.  User chooses which of the character types will be required.  Any combination that includes at least one type is allowed.

The number of each of the required character types is randomly generated.  For example, if a 16 digit password is requested, requiring only upper and lower case characters, then there will be at least one upper case letter and at least one lower case letter.  The distribution of the remaining characters is randomly generated.

The distribution of the character types is also randomly generated.

Interface with user is a webpage as follows:

![screenshot](Password-screenshot.png?raw=true "Password Generator screenshot")

User simple presses the "Generate Password" button.  

The user will be promped via pop-up window (alert command) how long they want their password to be,
and which characteristics they would like for their password:
    at least one special character;
    at least one number;
    at least one lowercase letter; and/or
    at least one uppercase letter.
They must choose at least one characteristic.

If they enter an invalid input, their mistake will be explained, and they will be re-prompted.

A random password is displayed on the screen in blue (to catch their attention!).  It the user doesn't like it, they can press "Generate Password" again to generate a new one.  When they see one they like, they can press "Copy to Clipboard" to copy it to the system clipboard, and paste it wherever it is needed.

The link to this app is at <mauraslavin.github.io/Password-Generator>