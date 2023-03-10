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

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            narwhal_props = narwhal.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0){
                element.remove();
            }else{
                if(narwhal_props.left < pipe_sprite_props.left + pipe_sprite_props.
                    width && bird_props.left + bird_props.width > pipe_sprite_props.
                    left && narwhal_props.top < pipe_sprite_props.top + 
                    pipe_sprite_props.height && narwhal_props.top + narwhal_props.
                    height > pipe_sprite_props.top){
                        game_state = 'End';
                        message.innerHTML = 'Game Over'.fontcolor('red') + 
                        '<br>Press Enter To Restart';
                        message.classList.add('messageStyle');
                        img.style.display = 'none';
                        return;
                    }else{
                        if(pipe_sprite_props.right < narwhal_props.left && 
                            pipe_sprite_props.right + move_speed >= narwhal_props.left &&
                            element.increase_score == '1'){
                                score_val.innerHTML =+ score_val.innerHTML + 1;
                            }
                            element.style.left = pipe_sprite_props.left - move_speed + 
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
                img.src = 'images/Narwhal-2.png';
                narwhal_dy = -7.6;

            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ''){
                img.src = 'images/Narwhal.png';

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

    let pipe_seperation = 0;
    let pipe_gap = 35;

    function create_pipe(){
        if(game_state != 'Play') return;


        if(pipe_seperation > 155){
            pipe_seperation = 0;
            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pip_sprite_inv = document.createElement('div');
            pip_sprite_inv.className = 'pipe_sprite';
            pip_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pip_sprite_inv.style.left = '100vw';

            document.body.appendChild(pip_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);

        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}