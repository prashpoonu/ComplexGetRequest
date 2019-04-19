function tableGenerator() {
  return `
    <table id="repoData">
        <th>
            Repository Name
        </th>
        <th>
            URL 
        </th>
    </table>
    `;
}
function addListeners() {
  $("button").on("click", function(event) {
    event.preventDefault();
    let input = searchUserHandle();
    callApi(input);
    console.log("`addListeners` ran");
    console.log(input);
  });
}
function searchUserHandle() {
  return $("#searchBox").val();
}

function display(data) {
  $("#display").html("");
  $("#display").append(tableGenerator());
  for (let i = 0; i < data.length; i++) {
    $("#repoData").append(
      `<tr>
        <td>${data[i].name}</td>
        <td>${data[i].html_url}</td>
      </tr>
    `
    );
  }
}

function callApi(handle) {
  const searchURL = `https://api.github.com/users/${handle}/repos`;
  fetch(searchURL)
    .then(res => res.json())
    .then(jsonResponse => display(jsonResponse))
    .catch(err => display(err));
}

function main() {
  addListeners();
}

$(main);
