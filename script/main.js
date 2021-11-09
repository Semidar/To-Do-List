window.addEventListener('load',()=>{

    let addBtn = document.querySelector('.add-task');
    let inputTask = document.querySelector('.task');
    let newTask = document.querySelector('.tasks');

    let tasks = [];

    if(localStorage.getItem('task')){
        tasks = JSON.parse(localStorage.getItem('task'));
        addTemplate();
    }
    
    addBtn.addEventListener('click',(e)=>{

        let task = {
            desc: inputTask.value,
            checked: false
        };
        if(inputTask.value == ''){
            inputTask.placeholder = 'Задача не может быть пустой';
            e.preventDefault();
        }
        else{
            tasks.push(task);
            addTemplate();
            localStorage.setItem('task', JSON.stringify(tasks));
            inputTask.value = '';
            inputTask.placeholder = '';
        }
    });

    function addTemplate(){
        templateMassege = '';
        if(tasks.length == 0){
            newTask.innerHTML = '';
        }
        tasks.forEach((item, index)=>{
            templateMassege +=`
                <div class="item">
                    <div class="description">
                        ${item.desc}
                    </div>
                    <div class="item-panel">
                        <input onclick='addTask(${index})' type="checkbox" ${item.checked ? 'checked' : ''} id='item_${index}' class="complete-btn">
                        <button onclick='dellTask(${index})' class="dell-btn">Удалить</button>
                    </div>
                </div>
            `;
            newTask.innerHTML = templateMassege;
        });
    }

    addTask = (index) => {
        
        tasks[index].checked = !tasks[index].checked;
        localStorage.setItem('task', JSON.stringify(tasks));
    }

    dellTask = (index)=>{
        tasks.splice(index, 1);
        localStorage.setItem('task', JSON.stringify(tasks));
        addTemplate();
    }

});


        


