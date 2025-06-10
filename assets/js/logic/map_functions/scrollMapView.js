$('#infoModal').on('show.bs.modal', function () {
  moveRight();
});

$('#infoModal').on('hidden.bs.modal', function () {
  moveLeft();
});
