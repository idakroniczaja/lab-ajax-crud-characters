class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;

  }

  getFullList () {
    axios
    .get(`${this.BASE_URL}/characters`)
    .then(response => {
      console.log('Response from API is: ', response.data);

      let str = '';

      response.data.forEach(character => {
  
          str += `
              <div class="character-info">
              <div class="id">Id: ${character.id}</div>
              <div class="name">Name: ${character.name}</div>
              <div class="occupation">Occupation: ${character.occupation}</div>
              <div class="cartoon">Is a Cartoon?: ${character.cartoon}</div>
              <div class="weapon">Weapon: ${character.weapon}</div>
              </div>`

      });
      document.querySelector('.characters-container').innerHTML = str;
      

    })
    .catch(err => console.log(err));
  }

  getOneRegister (id) {
    axios
    .get(`${this.BASE_URL}/characters/${id}`)
    .then(response => {
      const { id, name, occupation, cartoon, weapon } = response.data;
     

      let str = `
      <div class="character-info">
      <div class="id">Id: ${id}</div>
      <div class="name">Name: ${name}</div>
      <div class="occupation">Occupation: ${occupation}</div>
      <div class="cartoon">Is a Cartoon?: ${cartoon}</div>
      <div class="weapon">Weapon: ${weapon}</div>
      </div>`

      document.querySelector('.characters-container').innerHTML = str;
    

    })
    .catch(err => console.log(err));

  }

  createOneRegister () {
    const name = document.getElementById('name-input').value;
    const occupation = document.getElementById('occupation-input').value;
    const weapon = document.getElementById('weapon-input').value;
    const cartoon = document.getElementById('cartoon').value;

  const newCharacterInfo = {
    name,
    occupation,
    weapon,
    cartoon
  };

  //console.log('New character: ', newCharacterInfo);

  axios
  .post(`${this.BASE_URL}/characters`, newCharacterInfo)
   .then((response) => {
     
     const { name, id} = response.data;
     const newCharacterHtml = 
     `
     <div class="character-info">
     <div class="id">Id: ${id}</div>
     <div class="name">Name: ${name}</div>
     <div class="occupation">Occupation: ${occupation}</div>
     <div class="weapon">Weapon: ${weapon}</div>
     </div>`
     
     
     document.querySelector('.characters-container').innerHTML+= newCharacterHtml; 
     document.querySelector('#create-data').style.backgroundColor = 'green';
     //   // Clear the form after submitting:
     document.getElementById('new-character-form').reset();
    })
    .then(()=>this.getFullList())
    .catch(err => {
      console.log(`Error while saving a new character: ${err}`);
      document.querySelector('#create-data').style.backgroundColor = 'red';
    });
  }

  updateOneRegister (id) {

    const charName = document.querySelector('#update-name-input');
    const charOccupation = document.querySelector('#update-occupation-input');
    const charWeapon = document.querySelector('#update-weapon-input');
    const charCartoon = document.querySelector('#update-cartoon-input');
    const charId = document.querySelector('#char-id');
    
    //prefill the form
    axios
    .get(`${this.BASE_URL}/characters/${id}`)
    .then(response => {
      const { id, name, occupation, weapon, cartoon } = response.data;
      
      console.log(response.data)
      
      charId.value = id;
      charName.value = name;
      charOccupation.value = occupation;
      charWeapon.value = weapon;
      charCartoon.value = cartoon;
  
     
      
    })
    .catch(error => {
      error.response.status === 404 ? alert(`The id ${charId} doesn't exist.`) : alert('Server error! Sorry.');
 
      console.log('The error while getting a single character is: ', error.response);
    });

    //updating
     const updatedCharacter = {
            name: charName.value,
            occupation: charOccupation.value,
            weapon: charWeapon.value,
            cartoon: charCartoon.value
  };
 

  axios
    .put(`${this.BASE_URL}/characters/${charId}`, updatedCharacter)
    .then(response => {
      console.log(response);
      this.getFullList ()
      // clear the update form
      document.getElementById('edit-character-form').reset();
    
    })
    .catch(error => console.log(`Error while updating a character: ${error}`));
  }

  deleteOneRegister (id) {
    const toDelete = confirm('Are you sure you want to delete?');
    if (toDelete) {
      axios
        .delete(`${this.BASE_URL}/characters/${id}`)
        .then(response => {
          // Alert the succes message
          alert(response.data);
       
          // fetch all characters 
          this.getFullList()
          document.querySelector('#delete-one').style.backgroundColor = 'green';
    
        })
       
        .catch(err => {
          document.querySelector('#delete-one').style.backgroundColor = 'red';
          console.log(`Err while deleting character: ${err}`)
        }
          );
    }
  
  }
}
