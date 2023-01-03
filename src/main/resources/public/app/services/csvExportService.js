
export default function (tableData) {
    download(tableData.map(e => e.join(",")).join("\n"), "data.csv", "text/csv;encoding:utf-8");
}

const download = function(content, fileName, mimeType) {
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';
  
    if (navigator.msSaveBlob) { // IE10
      navigator.msSaveBlob(new Blob([content], {
        type: mimeType
      }), fileName);
    } else if (URL && 'download' in a) { //html5 A[download]
      a.href = URL.createObjectURL(new Blob([content], {
        type: mimeType
      }));
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
    }
  }

  /*
  const rows = [
    ["name1", "city1", "some other info"],
    ["name2", "city2", "more info"]
];

let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");
Then you can use JavaScript's window.open and encodeURI functions to download the CSV file like so:

var encodedUri = encodeURI(csvContent);
window.open(encodedUri);
*/