
$(document).ready(function(){
  
    
    //Music Class
    class Music{
        constructor(title,artist,rating){
            this.title=title;
            this.artist=artist;
            this.rating=rating;
        }
    }


    //UI cLASS
    class UI{
      static displayMusic(){
            const tasks=Store.getMusic();
            tasks.forEach((music)=>UI.addMusicToList(music));

        }
        
        static addMusicToList(music){
            let $musicList=$('#music-list');
            let $row=$('<tr>');
            $row.html( 
                '<td>'+music.title+'</td>'+
                '<td>'+music.artist+'</td>'+
                '<td>'+music.rating+'</td>'+
            '<td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>'
           );          
            $musicList.append($row);
        }

        static deleteMusic($el){
            if($el.hasClass('delete')){
                $el.parent().parent().remove();
            }
        }
        static showAlert(message,className)  {
            let $div= $('<div>');
            $div.addClass('alert alert-'+className);
            $div.append((document.createTextNode(message)));
            let $container=$('.container');
            let $form=$('#MusicForm');
            $container.append($div, $form);

            //counter in 3seconds
            setTimeout(()=> $('.alert').remove(),3000);
        }

        static clearFields(){
            $('#title').val('');
            $('#artist').val('');
            $('#rating-input').val('');

        }
    }

    
    // //Store Class
    class Store{
        static getMusic(){
            let tasks;
            if(localStorage.getItem('tasks')==null){
                tasks=[];
            
            }else{
                tasks= JSON.parse(localStorage.getItem('tasks'));

            }return tasks;
        }

    static addMusic(music){
            let tasks=Store.getMusic();
            tasks.push(music);
            localStorage.setItem('tasks', JSON.stringify(tasks));
    }
            static removeMusic($rating) {
               
                const tasks = Store.getMusic();
        
                tasks.forEach((music, index) => {
                    if (music.rating === $rating.parent().prev().text()) {
                        tasks.splice(index, 1);
                    }
                });
        
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
        

        //Diplay Music
        UI.displayMusic();

        //Add a Music
        $('#musicForm').on('submit', (e) => {
            
            e.preventDefault();

            let $title=$('#title').val();
            let $artist=$('#artist').val();
            let $rating=$('#rating-input').val();
            //validate
            if ($title === '' || $artist === '' || $rating === '') {
                
                // UI.showAlert('Please fill in all fields', 'danger');
            } else {
                //Instatiate task
                const music = new Music($title, $artist, $rating);
                //Add Book to UI
                UI.addMusicToList(music);
        
                //Add Task to Store
                Store.addMusic(music);
        
                //Show Success message
                UI.showAlert('Music Added', 'success');
        
                //clear fields
                UI.clearFields();
            }
        
            
        })

        //Event: Remove a Book
$('#music-list').on('click', (e) => {
    //Remove Task from UI
    UI.deleteMusic($(e.target));

    //Remove Task form store
    Store.removeMusic($(e.target));

    // //Show sucess message
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
    })
})
});
