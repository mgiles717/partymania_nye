# Ideas
## Concept
- 3-4 Phases with varying minigames per phase
- All points are attributed to teams, no need to count points per player as a result

## POC
- 4 Users: 2 teams, 2 users per team. 1 Host, 1 Observer
- Move from side A to finish of board
- Engage in one minigame
- Run the game from PC and on phone (Windows deployment probably, can do WSL if you want to redo command)

## Architecture
- Host:
    - Purely administrative
    - Distributes points
    - Can reset state to back to board (return to board)
    - Moves players
    - Should be able to debug any game issues if they occur
    - Distributing all responsibilities to the host player, drops large dependencies off of the system and onto the player to progress and move the game.
- Observer (Main Screen):
    - Responsible for showing board and leaderboard
    - Will be an event screen for multiplayer minigames
- Player (Mobile Users):
    - Any player that is not on a team once the game starts, will be completely ignored
    - Therefore, only players within the teams should allow to play, otherwise they could be defaulted to observer?? likely looks terrible on phone but this situation should never occur.

## Team Ideas
- Choose name
- Choose colour (Only one team per colour)
- Allow upload image for team
    - Replaces existing image
    - Going to be a pain no doubt with iPhone and Android

## Board Ideas
- Board per phase (3-4 boards)
- Different paths
    - Shorter but more difficult

## Minigame Ideas
- Community Vote, each player must decide which player would xyz:
    - Player with most votes (is the sacrifice) gets a contribution point
    - The players that voted for the most voted get a point per player.
        - Since in teams, if 2 in team, both vote, 2 points to team.
- Random events sent to random players
    - e.g If you can get someone to say a specific word in normal conversation, win a point for your team
- Special Items/Cards
    - Sabotage (my personal favourite)
        - When in a competitive game, screw over the opponent
            - e.g 