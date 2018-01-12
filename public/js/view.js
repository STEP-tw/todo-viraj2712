var counter = 1;
var limit = 1 / 0;

const addInput = function() {
  let form = document.getElementById('addList');
  var newdiv = document.createElement('div');
  newdiv.innerHTML = "Task " + (counter + 1) + " <br><input type='text' name='myInputs[]'>";
  form.appendChild(newdiv);
  counter++;
}
