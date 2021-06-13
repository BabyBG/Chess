Open 'Chess.html' to run the program.
Play against another person or the computer. 

To do:

- Rework enPassant to reduce extraneous calculations. Go through each mention of 'enPassant' for compliance
- Possible rework of movement.js to reduce memory usage - it is both large and called often. Considering arrays of data holding positions and respective possible moves instead of actively calculating moves each time.
- Create 'if' condition when CPU player generating likely opponent's moves that deletes any moves that have an immediately negative material outcome > 20 (eg rook takes pawn, rook taken by bishop).
- Add movement indicator arrow or in someway animate when a piece is moving across the board
- Add movement sound/check notification sound
- Clean up code & reduce repetitions (particularly in 'base_game/movement.js')
- Allow CPU to upgrade pawns, probably always a queen, unless queen results in stalemate or picking a knight results in checkmate/highly favourable trade
- Incorporate upgrading pawns into evaluation scores for CPU
- Light alpha-beta pruning once CPU is 3-4 moves deep into evaluation
- Way for CPU to recognise when predicted moves would cause stalemate through three-fold repetition or 50 move no pieces taken
- Trim down & clean up checkMoveRemoval.js

Version 0.3
- CPU temporarily doing far fewer passes to calculate moves. Aim to increase the number to more than before after some tweaking.
- Reworked and cleaned up movement.js & checkMoveRemoval.js. Movement now uses set data arrays rather than calculating each position from scratch every time.
- Fixed king moving into check vs pawn diagonal
- If CPU finds moves with equal score it will now pick one randomly instead of first in sequence
- Checkmates & stalemates assigned scores for CPU evaluation
- Fixed issue with pinned pieces moving while king is checked

Version 0.2
- Fixed issue causing computer to crash when evaluating checkmates

Version 0.1
- Base human vs human game works as intended
- AI overvalues baiting the opponent into unfavourable trades.
- AI can't recognise checkmate or stalemates as a favourable/unfavourable outcome
- AI doesn't factor pawns reaching the backline in it's evaluation
- Various AI functions not fully stable and cause freezes. Have not fully explored which are unreliable. 