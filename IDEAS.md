LOADER IDEAS

1.  Just for reference, let' call the main game, the one that loads the others, LOADER.

2.  Each other game has its own folder, and has its own .js and .css file. It can also
    have a .html file in that folder, so that the game can be developed without
    requiring the full LOADER setup. That .html file will be ignored if the game
    is running as part of the LOADER game.

    What I am after here is to let me develop a game outside the confines of LOADER,
    and then integrate it easily into LOADER when almost finished. So it can function
    as either a standalone game, or as a LOADER game.

    Per a chatty chat it appears that we can create something called a Shadow DOM,
    which would allow the game to run in either mode. I gather that the
    shadow DOM sort of 'takes over' the rendering in that central game panel, rather
    than working with the main DOM of the LOADER?

3.  The LOADER UI will be .json decorated, so that we can easily change colors, fonts,
    borders and such. That will allow us to reuse LOADER as LOADER-halloween,
    LOADER-xmas, etc just by changing the .json decorations.

4.  The LOADER left panel will have several variables that are exposed (is that the
    right word?) so that individual games can change them, such as SCORE, LEVEL,
    DESCRIPTION, RULES, etc; These will allow the game to communicate back to the
    LOADER left panel the state of the current game. Right now only the title and
    score are available, right? I would prefer a few others, but if that is too
    complicated then those other items can appear in the central game are I guess?

5.  I have already re-worked the LOADER in my branch features/sliding-panel, allowing
    the right panel to slide out of the way (1/2 way) when the game starts. That
    allows a fixed size of 905x720 for the game panel. A game can be designed for
    that exact size and dropped in, or for a smaller size and the LOADER will
    center it in the panel.

    I do not know how that will interact with the proposed shadow DOM? Will the .css
    of the shadow DOM work well when the game is smaller, and does not fit exactly
    into the 905x720 space? IDK.

6.  Is it reasonable to have the LOADER load each game as it is used, and unload
    it when done? Currently the LOADER loads all games at the beginning; if we keep
    our games very small then that would work I guess; but I would like to try some
    more adventurous games, which might be larger and have more pre-loaded assets,
    and worry that the size might be a problem? If the coding to have them
    load/unload is problematic then we can talk about it.

GAME IDEAS

Here are some game ideas I had.

1.  JUDGE! the player designs a halloween costume for a boy or girl. The interface
    is sort of a 'build your own' costume maker, maybe sliding sections, maybe dress
    up a paper doll fashion - IDK yet. The player has been given a prompt as to
    what kind of costume to design: "Design a costume for a 10 year old girl who
    is going to a Halloween party at their hippy friends house." When the costume is
    complete they submit it for judging, and a panel of three judges (aka American
    Idol or something?) issues their judging and the results are combined and a
    final score given. The judges are personalities in OpenAI's API system, who
    we prompt to give us particular judging (snarky, gushing, mean, etc).

2.  TP! A physics based artillery game, where the player launches toilet paper rolls at
    a pretty residential house (whose owner has pi\*\*ed off the launcher presumably?).
    The TP unrolls as it is launched and drops down to cover the lawn, trees, porch, roof
    and such after it is launched. The player is given 5 shots and the players score is
    how much of the house the player is able to cover, etc.
