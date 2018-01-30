const getElement = (id) => document.getElementById(id);
const getValue = (id) => getElement(id).value;
const encodeValue = (id) => encodeURIComponent(getValue(id));
const setHtml = (id, text) => getElement(id).innerHTML = text;
const setVisibility = (id, status) => getElement(id).style.visibility = status;
const setFocus = id => getElement(id).focus();

const doXhr = function(url, method, reqListener, data) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      reqListener.call(this);
    }
  };
  if (method == 'post') xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  data ? xhr.send(data) : xhr.send();
}
