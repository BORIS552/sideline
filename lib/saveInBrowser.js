/**
 * Define utils to save/load canvas status with local storage
 */
window.saveInBrowser = {
  save: (name, value) => {
    // if item is an object, stringify
    if (value instanceof Object) {
      console.log(value);
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(value));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download",  "template.json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      value = JSON.stringify(value);
      console.log("saved data in browser");
      console.log(value);
    }

    localStorage.setItem(name, value);
  },
  load: (name) => {
    let value = localStorage.getItem(name);
    value = JSON.parse(value);

    return value;
  },
  remove: (name) => {
    localStorage.removeItem(name);
  }
}