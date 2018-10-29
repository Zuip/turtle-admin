export default function (a, b) {

  let lowerCaseA = a.name.toLowerCase();
  let lowerCaseB = b.name.toLowerCase();

  if(lowerCaseA === lowerCaseB) {
    return 0;
  }

  return lowerCaseA > lowerCaseB ? 1 : -1;
};