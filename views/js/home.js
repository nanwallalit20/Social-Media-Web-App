// home.js

// Initialize an array to store the selected task IDs
let selectedTaskIds = [];

function handleCheckboxSelect(taskId) {
  const checkbox = document.getElementById(`checkbox-${taskId}`);
  
  // If the checkbox is checked, add the task ID to the array
  if (checkbox.checked) {
    selectedTaskIds.push(taskId);
  } else {
    // If the checkbox is unchecked, remove the task ID from the array
    const index = selectedTaskIds.indexOf(taskId);
    if (index > -1) {
      selectedTaskIds.splice(index, 1);
    }
  }
  console.log("hello",selectedTaskIds);

  // Update the delete button's anchor tag with the updated task IDs
  const deleteButton = document.getElementById('deleteLink');
  deleteButton.setAttribute('href', `/Task/delete?ids=${selectedTaskIds}`);

  console.log(deleteButton);
  
}
