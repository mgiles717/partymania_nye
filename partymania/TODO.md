# TODO
### Immediate
- Allow player to set username = DONE
- Allow user to set role to host or observer (medium)
- Allow user to join a team (big) = DONE backend
    - Create interface for a user to join the team
- Should probably refactor player, host, observer to an Enum only, as indepedent classes seem unnecessary with current workflow. We can just determine all users who are of certain roles, which will be constant once the game starts, and then serve all those users with the relevant values.