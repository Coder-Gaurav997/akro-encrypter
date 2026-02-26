// AKRO Encryption Algorithm - TypeScript Port

const DEFAULT_KEY = "KEY";

// Convert text to comma-separated ASCII values
function convertToAscii(text: string): string {
  return text.split("").map((char) => char.charCodeAt(0).toString()).join(",");
}

// Add repeating KEY ASCII values to text ASCII values
function addKeyToAscii(asciiText: string, key: string): string {
  const asciiList = asciiText.split(",");
  const encrypted: string[] = [];
  for (let i = 0; i < asciiList.length; i++) {
    const textAscii = parseInt(asciiList[i]);
    const keyAscii = key.charCodeAt(i % key.length);
    encrypted.push((textAscii + keyAscii).toString());
  }
  return encrypted.join(",");
}

// Insert random junk letters after every 3rd element
function addRandomJunk(encryptedText: string): string {
  const asciiList = encryptedText.split(",");
  const result: string[] = [];
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < asciiList.length; i++) {
    result.push(asciiList[i]);
    if ((i + 1) % 3 === 0) {
      result.push(letters[Math.floor(Math.random() * letters.length)]);
    }
  }
  return result.join(",");
}

// Reverse the entire encrypted sequence
function reverseEncryptedStr(junkAddedText: string): string {
  return junkAddedText.split(",").reverse().join(",");
}

// --- DECRYPTION ---

function reverseBack(text: string): string[] {
  return text.split(",").reverse();
}

function removeRandomJunk(reversedList: string[]): string[] {
  return reversedList.filter((_, i) => (i + 1) % 4 !== 0);
}

function subtractKey(asciiList: string[], key: string): number[] {
  return asciiList.map((val, i) => {
    return parseInt(val) - key.charCodeAt(i % key.length);
  });
}

function asciiToText(asciiValues: number[]): string {
  return asciiValues.map((num) => String.fromCharCode(num)).join("");
}

// --- PUBLIC API ---

export function encrypt(text: string, key: string = DEFAULT_KEY): string {
  const asciiText = convertToAscii(text);
  const encrypted = addKeyToAscii(asciiText, key);
  const junkAdded = addRandomJunk(encrypted);
  return reverseEncryptedStr(junkAdded);
}

export function decrypt(encodedText: string, key: string = DEFAULT_KEY): string {
  try {
    const reversedList = reverseBack(encodedText);
    const cleanAscii = removeRandomJunk(reversedList);
    const originalAscii = subtractKey(cleanAscii, key);
    return asciiToText(originalAscii);
  } catch {
    return "Error: Invalid encrypted text";
  }
}
