



export function devWarning(text) {
    // display a warning in the console
    console.log( "WARNING: " + text );
}


export function userConsoleNote(text) {
    // display a warning in the console
    console.log( "FOCUS FOR TRELLO: " + text );
}


export function debugLog(input) {
    // display a warning in the console

    if( typeof input === "string" )     console.log( "FOCUS: " + input );
    else                                console.log( input );
}