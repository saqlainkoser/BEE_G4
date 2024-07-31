//File system module Node Js

const fs = require('fs');
//write 
fs.writeFileSync("G4_text.txt","This very good class.");
//append
fs.appendFileSync("G4_text.txt","\nThis is my next line");
//read
const buff_data=fs.readFileSync("G4_text.txt");
console.log(buff_data)
const real_data=buff_data.toString()
console.log(real_data);

//Rename the G4_text.txt file to G4_myfile.txt using fs module
//Delete the G4_text.txt file using fs module
//create a folder using fs module

fs.renameSync("G4_text.txt","G4_myFile.txt");
fs.unlinkSync("G4_myFile.txt");
fs.mkdirSync("Challenge");


