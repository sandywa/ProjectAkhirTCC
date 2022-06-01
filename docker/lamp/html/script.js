console.log("Tes")
fetch("http://192.168.60.128:3030/api/read")
    .then(Response => Response.json())
    .then(json => {
        let body = `
    <div class="my-3 col-12">
        <h3 class="card-title ">Note Body</h3>    
    </div>`
        console.log(body)
        json.forEach(note => {
            body += `<div class="my-3 col-6">
        <div class="card" >
          <div class="card-body">
            <h5 class="card-title">${note.judul}</h5>
            <p class="card-text">${note.text}</p>
            <button href="" onclick="getIdAPI(${note.id})" data-bs-toggle="modal" data-bs-target="#modal${note.id}" class="col-5 btn btn-primary">Edit</button>
            <a onclick="deleteNote(${note.id})" class="btn btn-danger col-5">Delete</a>
          </div>
        </div>
      </div>
      <!-- Modal -->
<div class="modal fade" id="modal${note.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form action="" method="post" enctype="multipart/form-data">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Judul</label>
        <input type="text" class="form-control" id="judulNote${note.id}">
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Note</label>
        <textarea class="form-control" id="textNote${note.id}" rows="5"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="updateAPI(${note.id})">Save changes</button>
      </div>
    </form>
      </div>
      
    </div>
  </div>
</div>
      `

        });
        document.getElementById("notebody").innerHTML = body;
    })
async function postAPI() {
    const obj = {
        judul: document.getElementById("judulNote").value,
        text: document.getElementById("textNote").value
    }
    await fetch("http://192.168.60.128:3030/api/create", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
	    location.reload()
            alert(`Berhasil ${response.json()}`);
        })
        .catch(err => alert(`Tidak Berhasil ${err}`))
}

async function getIdAPI(idValue) {
    const judulForm = document.getElementById("judulNote" + idValue);
    const textForm = document.getElementById("textNote" + idValue);
    const obj = {
        id: idValue
    }
    try {
        const notes = await fetch("http://192.168.60.128:3030/api/getId", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })


        const res = await notes.json()
        res.forEach(oldValue => {
            judulForm.setAttribute("value", `${oldValue.judul}`)
            textForm.innerHTML = oldValue.text
        })
    } catch (err) {
        console.log(err)
    }
}

async function updateAPI(idNote) {
    const obj = {
        id: idNote,
        judul: document.getElementById("judulNote" + idNote).value,
        text: document.getElementById("textNote" + idNote).value
    }
    await fetch("http://192.168.60.128:3030/api/update", {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            alert(`Berhasil ${response.json()}`);
            location.reload()
        })
        .catch(err => alert(`Tidak Berhasil ${err}`))
}
function deleteNote(idNote) {
    const deleteConfirm = confirm("Apakah anda yakin ingin menghapusnya")
    if (deleteConfirm) {
        deleteAPI(idNote)
    }

}
async function deleteAPI(idNote) {
    const obj = {
        id: idNote,
    }
    await fetch("http://192.168.60.128:3030/api/delete", {
        method: "DELETE",
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            alert(`Berhasil ${response.json()}`);
            location.reload()
        })
        .catch(err => alert(`Tidak Berhasil ${err}`))
}