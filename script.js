let move_speed = 3, gravity = 0.5;
let narwhal = document.querySelector('.narwhal');
let img = document.getElementById('narwhal-1');

let narwhal_props = narwhal.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.pip_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        narwhal.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play(){
    function move(){
        if(game_state != 'Play') return;

        let bubble_sprite = document.querySelectorAll('.bubble_sprite');
        bubble_sprite.forEach((element) => {
            let bubble_sprite_props = element.getBoundingClientRect();
            narwhal_props = narwhal.getBoundingClientRect();

            if(bubble_sprite_props.right <= 0){
                element.remove();
            }else{
                if(narwhal_props.left < bubble_sprite_props.left + bubble_sprite_props.
                    width && narwhal_props.left + narwhal_props.width > bubble_sprite_props.
                    left && narwhal_props.top < bubble_sprite_props.top + 
                    bubble_sprite_props.height && narwhal_props.top + narwhal_props.
                    height > bubble_sprite_props.top){
                        game_state = 'End';
                        message.innerHTML = 'Game Over'.fontcolor('red') + 
                        '<br>Press Enter To Restart';
                        message.classList.add('messageStyle');
                        img.style.display = 'none';
                        return;
                    }else{
                        if(bubble_sprite_props.right < narwhal_props.left && 
                            bubble_sprite_props.right + move_speed >= narwhal_props.left &&
                            element.increase_score == '1'){
                                score_val.innerHTML =+ score_val.innerHTML + 1;
                            }
                            element.style.left = bubble_sprite_props.left - move_speed + 
                            'px';

                    }
            }

        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let narwhal_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        narwhal_dy = narwhal_dy + gravity;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ''){
                img.src = 'images/narwhal-2.png';
                narwhal_dy = -7.6;

            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ''){
                img.src = 'images/narwhal.png';

            }
        });

        if(narwhal_props.top <= 0 || narwhal_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        narwhal.style.top = narwhal_props.top + narwhal_dy + 'px';
        narwhal_props = narwhal.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }

    requestAnimationFrame(apply_gravity);

    let bubble_seperation = 0;
    let bubble_gap = 35;

    function create_bubble(){
        if(game_state != 'Play') return;


        if(bubble_seperation > 155){
            bubble_seperation = 0;
            let bubble_posi = Math.floor(Math.random() * 43) + 8;
            let bubble_sprite_inv = document.createElement('div');
            bubble_sprite_inv.className = 'bubble_sprite';
            bubble_sprite_inv.style.top = bubble_posi - 70 + 'vh';
            bubble_sprite_inv.style.left = '100vw';

            document.body.appendChild(bubble_sprite_inv);
            let bubble_sprite = document.createElement('div');
            bubble_sprite.className = 'bubble_sprite';
            bubble_sprite.style.top = bubble_posi + bubble_gap + 'vh';
            bubble_sprite.style.left = '100vw';
            bubble_sprite.increase_score = '1';

            document.body.appendChild(bubble_sprite);

        }
        bubble_seperation++;
        requestAnimationFrame(create_bubble);
    }
    requestAnimationFrame(create_bubble);
}