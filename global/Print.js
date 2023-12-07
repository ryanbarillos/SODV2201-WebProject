/*
    Shortcut for console.log's and the likes
*/

// "echo" is printing on Bash (used on Linux & MacOS
echo = (msg) => {
  console.log(msg);
};

// "print" from C or Python
print = (msg) => {
  console.log(msg);
};

module.exports = { echo, print };
