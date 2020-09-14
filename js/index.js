const form = document.querySelector('#form');


const renderToUI = (doc)=>{
    const list = document.getElementById('table-body');

        const row = document.createElement('tr');
        row.setAttribute('id', doc.id);
        row.innerHTML = `<td>${doc.data().title}</td>
                        <td>${doc.data().author}</td>
                        <td>${doc.data().isbn}</td>
                        <td><i class="fa fa-trash delete"></i></td>`

        list.appendChild(row);

        const deleteBtn = document.querySelectorAll(".delete");
        deleteBtn.forEach(del =>{
            del.addEventListener('click', e =>{
                let id = e.target.parentElement.parentElement.getAttribute('id');
                db.collection('booklist').doc(id).delete();
            })
        })
}




db.collection('booklist').onSnapshot(snapshot =>{
    // console.log(snapshot.docs);
    let change = snapshot.docChanges();
    // console.log(change);
    change.forEach(change =>{
        if(change.type === 'added'){
            renderToUI(change.doc);
        } else if(change.type === 'removed'){
            let td = document.querySelector(`#${change.doc.id}`) 
            td.remove();
        }
    })
});

form.addEventListener('submit', e =>{
    e.preventDefault();
    if(form['title'].value === '' || form['author'].value === '' || form['isbn'].value ===''){
        alert('Kindly Enter The Required Fields');
    } else{
        db.collection('booklist').add({
            title : form['title'].value,
            author : form['author'].value,
            isbn : form['isbn'].value
        })
        form['title'].value  = '';
        form['author'].value = '';
        form['isbn'].value = '';
    
    }
    
})