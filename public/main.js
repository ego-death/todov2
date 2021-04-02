const tasks = Array.from(document.querySelectorAll('.task'));
const deletes = Array.from(document.querySelectorAll('.delete'));
tasks.forEach(el=>{
    el.addEventListener('click', async function(){
        const taskName = this.parentNode.childNodes[1].innerText;
        const completed = Array.from(this.classList).includes('complete');
        const res = await fetch('/modify', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({taskName, completed})
        }) 
        const data = await res.json();
        console.log(data);
        window.location.reload();
    })
});
deletes.forEach(el=>{
    el.addEventListener('click', async function(){
        const taskName = this.parentNode.childNodes[1].innerText;
        const completed = Array.from(this.classList).includes('complete');
        const res = await fetch('/modify', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({taskName, completed})
        }) 
        const data = await res.json();
        console.log(data);
        window.location.reload();
    })
});