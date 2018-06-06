export default function(text, textToAdd, startPosition, endPosition) {

  if(startPosition === null || endPosition === null) {
    return text + textToAdd;
  }

  return text.substring(0, startPosition)
       + textToAdd
       + text.substring(endPosition, text.length);
};
