# Project's name
Angry Fietser

## Description
The player is an urban cyclist that hates turists. The ciclist must crash as many turists as posible
to win points. Avoid crashing against cars.



## MVP (DOM - CANVAS)
MVP definition, deliverables.

- 2D canvas context with a road and sidewalk background that move.
- Bike is static at the left end of the screen but the player is able to move the bike up and down, giving the impression the bike changes lanes on the road. 
- Random turists appear on the road.
- Collision between turist and bike give points to the player.

1. Draw road.
2. Draw static biker element.
3. Add movement effect to road.
4. Add up/down movement to biker.
5. Generate random turists.
6. Generate collision events between player and turists. Turists elements dissapear on collission. 
7. Biker gains points on collissions with turists. Show points on DOM. 

## Backlog

8. Set an interval that makes the background move faster every X amount of time.
9. Add cars (obstacles) the biker needs to avoid. 
10. Avoid tourists and cars being generated on the same position.
10. Generate collission between car and biker. Upon collission the biker looses health. 
11. Add forward and backward movement functionality to the biker.
12. Improve graphics

## Data structure

- Class Game
    - Properties:
        - biker
        - tourists
        - context
        - rows
        - columns
        - bikerPoints
        - bikerHealth
        - road / background
    - Functions:
        - _draw = board/biker/tourists/road
        - update : all of the above
        - start
        - Pause

- Class Biker
    - Properties:
        - position
        - health
    - Functions:
        - moveRight
        - moveLeft
        - collision: with tourists

- Class tourists
    - Properties:
        - position
    - Functions:
        - collision: with biker

- Class background & road ?
    - Properties
        - speed
    - Functions
        - Speed



EXTRA - Backlog

- Class Cars
    - Properties:
        - position
    - Functions:
        - collision: with biker


## States y States Transitions
Definition of the different states and their transition (transition functions)

- initial screen
    - playing instructions
    - start button

- gameScreen
    - playing board (canvas)
    - points and lives (DOM)
    - Pause button (DOM)

- gameoverScreen
    - Bye Bye message
    - Restart button



## Task
https://trello.com/b/mLOB9V0M/angry-fietser


## Links


### Trello
https://trello.com/b/mLOB9V0M/angry-fietser


### Git
https://github.com/MarcGal/Angry-Fietser

[Link Deploy](http://github.com)


### Slides
https://slides.com/margal/angry-fietser/edit