

//Music Class
class Music {
    constructor(title, artist, rating) {
        this.title = title;
        this.artist = artist;
        this.rating = rating;
    }
}

//UI Class
class UI {
    static displayMusic() {
        const tasks = Store.getMusic();

        tasks.forEach((music) => UI.addMusicToList(music));

    }

    static addMusicToList(music) {

        let musicList = document.querySelector('#music-list');

        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${music.title}</td>
        <td>${music.artist}</td>
        <td>${music.rating}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        `;

        musicList.appendChild(row);
    }

    static deleteMusic(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div')
            ;
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#MusicForm');
        container.insertBefore(div, form);

        //counter in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#artist').value = '';
        document.querySelector('#rating-input').value = '';
    }
}



//Store Class Store
class Store {
    static getMusic() {
        var tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    static addMusic(music) {
        const tasks = Store.getMusic();
        tasks.push(music);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static removeMusic(rating) {
        const tasks = Store.getMusic();

        tasks.forEach((music, index) => {
            if (music.rating === rating) {
                tasks.splice(index, 1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}



//Event:Display Music
document.addEventListener('DOMContentLoaded', UI.displayMusic);

//Event:Add a Music
document.querySelector('#musicForm').addEventListener('submit', (e) => {

    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const artist = document.querySelector('#artist').value;
    const rating = document.querySelector('#rating-input').value;

    //Validate
    if (title === '' || artist === '' || rating === '') {

        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        //Instatiate task
        const music = new Music(title, artist, rating);
        //Add Book to UI
        UI.addMusicToList(music);

        //Add Task to Store
        Store.addMusic(music);

        //Show Success message
        UI.showAlert('Music Added', 'success');

        //clear fields
        UI.clearFields();
    }

});



//Event: Remove a Book
document.querySelector('#music-list').addEventListener('click', (e) => {
    //Remove Task from UI
    UI.deleteMusic(e.target);

    //Remove Task form store
    Store.removeMusic(e.target.parentElement.previousElementSibling.textContent);

    //Show sucess message
    UI.showAlert('Music Removed', 'success');
})
    //Sorting Features
        $('th').each(function (col) {
            $(this).hover(
                    function () {
                        $(this).addClass('focus');
                    },
                    function () {
                        $(this).removeClass('focus');
                    }
            );
            $(this).click(function () {
                if ($(this).is('.asc')) {
                    $(this).removeClass('asc');
                    $(this).addClass('desc selected');
                    sortOrder = -1;
                } else {
                    $(this).addClass('asc selected');
                    $(this).removeClass('desc');
                    sortOrder = 1;
                }
                $(this).siblings().removeClass('asc selected');
                $(this).siblings().removeClass('desc selected');
                var arrData = $('table').find('tbody >tr:has(td)').get();
                arrData.sort(function (a, b) {
                    var val1 = $(a).children('td').eq(col).text().toUpperCase();
                    var val2 = $(b).children('td').eq(col).text().toUpperCase();
                    if ($.isNumeric(val1) && $.isNumeric(val2))
                        return sortOrder == 1 ? val1 - val2 : val2 - val1;
                    else
                        return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
                });
                $.each(arrData, function (index, row) {
                    $('tbody').append(row);
                });
            });
        });

    
   
       
       



    





