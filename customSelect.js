const generateSelect = (target) => {

    //add custom select structure
    function wrap(el, classes, ids) {
        let wrapper = document.createElement( 'div' );
        let innerWrapper = document.createElement( 'ul' );
        let label = document.createElement( 'div' );
        el.parentNode.insertBefore(wrapper, el);
        let classList = classes.split(' ').filter(v => v !== '')
        wrapper.classList.add( ...classList );
        wrapper.setAttribute('id', ids);
        innerWrapper.classList.add( 'options' );
        label.classList.add( 'label' );
        wrapper.appendChild(el);
        wrapper.appendChild(label);
        wrapper.appendChild(innerWrapper);
    }

    //get all select elements
    const select = document.querySelectorAll( target );
    for(e of select){

        //get select classes
        const classes = e.classList.value;
        const ids = e.getAttribute('id');

        // add wrapper in select element
        wrap(e, `select ${classes}`, ids);

        // add custom select options
        const options = e.querySelectorAll( 'option' );
        for(let i = 0; i < options.length; i++){
            let html = `<li class='${options[i].selected && 'current'}' value='${options[i].value}'>${options[i].innerText}</li>`;
            e.parentNode.querySelector( '.options' ).innerHTML += html;
        }

        //add options and label
        e.parentNode.querySelector( '.label' ).innerHTML = options[0].innerHTML;

    }

    //change label value when user select option
    let selectLabel =  document.querySelectorAll('.select .label');
    selectLabel.forEach(e => {
        e.addEventListener('click', () => {
            if(e.parentNode.classList.contains('active')){
                e.parentNode.classList.remove('active');
            }else{
                e.parentNode.classList.add('active');
            }
        });
    });

    //change select value when user select option
    let selectOptions =  document.querySelectorAll('.select .options > li');
    selectOptions.forEach(e => {
        e.addEventListener('click', () => {
            e.closest(".select").querySelector('.label').innerHTML = e.innerHTML;
            e.closest(".select").classList.remove('active');
            e.closest(".select").querySelector('select').value = e.getAttribute("value");
            let siblings = e.closest(".select").querySelectorAll('.options li')
            for(s of siblings){
                s.classList.remove('current')
            }
            e.classList.add('current')
        });
    });

    //remove active class when user click outside
    let outsideSelect =  document.querySelectorAll('.select');
    outsideSelect.forEach(elm => {
        document.addEventListener('click', (e) => {
            if(!elm.contains(e.target)){
                elm.classList.remove('active')
            }
        })
    })

}

document.addEventListener('DOMContentLoaded', () => {
   generateSelect('select');
})