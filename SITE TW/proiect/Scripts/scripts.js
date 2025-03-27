document.addEventListener('DOMContentLoaded',function(){
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdown.addEventListener('click',function(e){
        dropdownMenu.classList.toggle('visible');
        e.stopPropagation();
    });
    document.addEventListener('click',function(){
        if(dropdownMenu.classList.contains('visible')){
            dropdownMenu.classList.remove('visible');
        }
    });
    dropdownMenu.addEventListener('click',function(e){
        e.stopPropagation();
    });
});
