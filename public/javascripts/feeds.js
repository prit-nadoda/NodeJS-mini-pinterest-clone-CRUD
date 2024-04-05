// Adjust column count based on the height of the container
function adjustColumnCount() {
  const container = document.getElementById('gridContainer');
  const columnWidth = 220; // Adjust based on your design
  const columnCount = Math.floor(container.clientWidth / columnWidth);
  container.style.columnCount = columnCount;
}

// Recalculate column count on window resize
window.addEventListener('resize', adjustColumnCount);

// Initial adjustment on load
window.addEventListener('load', adjustColumnCount);
