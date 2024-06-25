# Memory

## Overview

This is a memory game made with HTML, CSS, and JS. To begin, it opens a start screeen where you can hit the start button. It will bring you to the game screen which should have a 4 by 4 grid of cards face-down. The timer will begin and you can click on cards to start playing. The card you click will flip over and stay flipped over until you click a second card. Then it will check if the card images match. If they do, then the cards will stay flipped over (image-side up) and you can click on another card to continue playing. Each pair that you click will count as one move on the moves counter. The game will end when you complete all the matches on the board. 

### How to Run Locally

1. Have Docker running [https://docs.docker.com/engine/install/]
2. Clone repository using Git Bash (https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
3. Within this directory run `docker build -t memory_game .`
4. Run `docker run -d -p 8080:8080 memory_game`
5. In browser go to `localhost:8080`
6. When finished with it, run `docker stop <docker container id>` or you can stop the container in the docker desktop app

### Acknowledgements

This game was made with some help from "Coding Artist" on youtube. The following is a link to the tutorial which was used to create some of the game: https://www.youtube.com/watch?v=dqqxkrKhfS4
