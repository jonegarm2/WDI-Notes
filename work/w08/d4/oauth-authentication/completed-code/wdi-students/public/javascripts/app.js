var allStudents;
var filteredStudents = [];
var searchName = '';
var template;

$(function() {
  // load all students one time at load
  $.get('/api/students', function(data) {
    allStudents = data;
    template = _.template($('#studentTemplate').html());
    render();
  });
});

function render() {
  applyFilterAndSort();
  $('#students').html(template({students: filteredStudents}));
}

function applyFilterAndSort() {
  if (searchName) {
    filteredStudents = allStudents.filter(function(student) {
      return student.name.toLowerCase().indexOf(searchName.toLowerCase()) >= 0;
    });
  } else {
    filteredStudents = allStudents;
  }
  var sortKey = $('#sortCohort').is(":checked") ? 'cohort' : 'name';
  filteredStudents = _.sortBy(filteredStudents, sortKey);
}

function doSearch() {
  var curSearch = $('#search').val();
  if (curSearch != searchName) searchName = curSearch;
  render();
}

function addFact() {
  if (!$('#fact').val()) return;
  fetch('/api/facts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // send the cookies!
    body: JSON.stringify({ fact: $('#fact').val() })
  })
  .then(res => res.json())
  .then(data => {
    $('#fact').val('');  // clear the <input>
    // find the updated student's index
    var idx = allStudents.findIndex(s => s._id === data._id);
    allStudents[idx] = data;
    render();
  });
}

function delFact(factId) {
  fetch(`/api/facts/${factId}`, {
    method: 'DELETE',
    credentials: 'include' // send the cookies!
  })
  .then(res => res.json())
  .then(data => {
    var student = allStudents.find(s => s.facts.some(f => f._id == factId));
    student.facts.splice(student.facts.findIndex(f => f._id == factId), 1);
    render();
  });
}

function setCohort() {
  console.log($('#cohort').val())
  fetch('/api/students/cohort', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // send the cookies!
    body: JSON.stringify({ cohort: $('#cohort').val() })
  })
  .then(res => res.json())
  .then(data => {
    var idx = allStudents.findIndex(s => s._id === data._id);
    allStudents[idx] = data;
    render();
  });
}

/* ----- event handlers ----- */

$('#search').on('keypress blur', function(evt) {
  if (evt.keyCode === 13 || evt.type === 'blur') doSearch();
});

$('[type="radio"]').on('change', function() { render(); });

$('#students').on('click', 'li.collection-item a', function() {
  removeFact($(this).attr('data'));
});
