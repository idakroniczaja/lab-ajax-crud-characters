const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI.getFullList () 
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const id = document.getElementById("character-id").value;
    charactersAPI.getOneRegister (id) 
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const id = document.getElementById("character-id-delete").value;
    charactersAPI.deleteOneRegister (id);
    
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    const id = document.getElementById("char-id").value;
    charactersAPI.updateOneRegister(id) 
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    charactersAPI.createOneRegister()
    event.preventDefault();// <= !!! Prevent the refresh
  });
});
