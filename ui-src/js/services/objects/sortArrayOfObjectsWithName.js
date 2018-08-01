export default {
  alphabetically(arrayOfObjects) {
    return arrayOfObjects.slice(0).sort((object1, object2) => {

      let name1 = object1.name.toLowerCase();
      let name2 = object2.name.toLowerCase();

      if(name1 === name2) {
        return 0;
      }

      return name1 > name2 ? 1 : -1;
    });
  }
};