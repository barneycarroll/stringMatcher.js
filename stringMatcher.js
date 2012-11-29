// Take in an array of strings, find common components, 
// Returns an object of format
// {
//   common:  [], // Array of common parts
//   strings: [
//     []         // For each string, an array of individual parts
//   ]
// }

function stringMatch(input){
	var common    = [];
	var strings   = [];
	var minLength = Infinity;

	// Determine smallest length:
	// We'll count that far for possible matches.
	void function getMinLength(){
		_.each(input, function testLength(inputStr){
			if(inputStr.length < minLength){
				minLength = inputStr.length;
			}

			// While we're at it, populate the output buffer
			strings.push([]);
		});
	}();

	void function findMatches(){
		// Which character we're testing
		var charIndex      = 0;
		var charMatch;
		var charStr;
		// A cached flag for whether the last test passed.
		// Allows us to extend strings.
		var lastMatched    = false;
		var lastMatchIndex = -1;

		while(charIndex < minLength){
			void function testForMatch(){
				charStr   = undefined;
				charMatch = _.all(input, function testStringForMatch(inputStr, strIndex){
					if(!charStr){
						charStr = inputStr[charIndex];
					}

					return charStr === inputStr[charIndex];
				});
			}();

			void function recordMatch(){
				if(charMatch){
					if(!lastMatched){
						common.push(charStr);
					}
					else {
						common[common.length-1] += charStr;
					}
				}
			}();

			void function separateStrings(){
				if(charMatch){
					if(charIndex === 0){
						_.each(input, function prependString(inputStr, strIndex){
							strings[strIndex].push('');
						});
					}
					else if(!lastMatched){
						_.each(input, function addToString(inputStr, strIndex){
							strings[strIndex].push(inputStr.substring(lastMatchIndex + 1, charIndex));
						});
					}

					lastMatchIndex = charIndex;
					lastMatched = true;
				}
				else {
					lastMatched = false;
				}
			}();

			charIndex++;
		}

		// After the while loop, append each string array with the remainder of each string
		_.each(input, function appendString(inputStr, strIndex){
			strings[strIndex].push(inputStr.substring(lastMatchIndex + 1, Infinity));
		});
	}(undefined);

	return {
		common  : common,
		strings : strings
	}
}
