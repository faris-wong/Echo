import React from "react";
import styles from "./css/Newsfeed.module.css";

const Newsfeed = () => {
  return (
    <div className="newsFeed">
      <h1 className={styles.newsTitle}>Indie Game News</h1>

      <div className={styles.newsInfo}>
        <h4>Little Kitty, Big City</h4>
        <p className={styles.releaseInfo}>
          Release date: May 9, 2024 <br /> Platform(s): PC, Xbox One, Xbox
          Series X/S, Switch
        </p>
        <p>
          Little Kitty, Big City sounds like the purrfect adventure to get lost
          in. As an adorable cat, you can make the city your playground and
          explore to your heart's content. While you have the goal of trying to
          find your way home again, you can take everything at your own pace.
          From making friends with other animals, to completing quests, and even
          taking a nap, developer Double Dagger Studio's delightful sandbox
          looks set to have plenty to offer us as we take on the role of a
          pawsome protagonist. Oh, and you put hats on the cat. That's very
          important to know.
        </p>
      </div>
      <div className={styles.newsInfo}>
        <h4>Paper Trail</h4>
        <p className={styles.releaseInfo}>
          Release date: May 21, 2024 <br /> Platform(s): PC, Xbox One, Xbox
          Series X/S, PS4, PS5
        </p>
        <p>
          Paper Trail looks like a charming new puzzle adventure that takes
          place in a paper world. Since everything is made of paper, the world
          itself can fold, rotate, and spin around to allow you to create paths
          and puzzle your way through locations. Developed by Newfangled Games,
          Paper Trail is set to explore the story of Paige who's just about to
          leave home for the first time to pursue her studies as an up and
          coming academic. It certainly has a unique design and concept that has
          caught our attention, with the added bonus of secrets to uncover.
        </p>
      </div>
      <div className={styles.newsInfo}>
        <h4>Hauntii</h4>
        <p className={styles.releaseInfo}>
          Release date: May 23, 2024 <br /> Platform(s): PC, Xbox One, Xbox
          Series X/S, PS4, PS5, Switch
        </p>
        <p>
          Hauntii is an eye-catching upcoming adventure from developer Moonloop
          Games that sees you take on the role of a ghost in search of answers.
          What makes Hauntii so unique, though, is that it's actually a
          twin-stick shooter that's designed to be taken at a slower pace. Using
          twin-stick controls to blast past foes and navigate through obstacles,
          you can also possess all manner of objects in the world to use or play
          around with as you puzzle your way through the mysterious setting
          known as Eternity. Stylistically, it looks hauntingly beautiful, and
          the concept makes this one adventure to watch out for.
        </p>
      </div>
      <div className={styles.newsInfo}>
        <h4>Duck Detective: The Secret Salami</h4>
        <p className={styles.releaseInfo}>
          Release date: May 23, 2024 <br /> Platform(s): PC, Switch
        </p>
        <p>
          Duck Detective: The Secret Salami from developer Happy Broccoli Games
          is an upcoming gumshoe adventure starring a detective duck with a
          bread problem, plenty of puns, and some humorous homages to noir
          detective stories. From investigating to interviewing suspects, you'll
          have to try to fill in the blanks by finding clue words. It's
          described as a mix between Aggretsuko and Obra Dinn, and with a cast
          of colorful characters to meet and a case to solve, this has wishlist
          material written all over it.
        </p>
      </div>
      <div className={styles.newsInfo}>
        <h4>The Gecko Gods</h4>
        <p className={styles.releaseInfo}>
          Release date: Spring 2024 <br /> Platform(s): PC, Switch
        </p>
        <p>
          If you're looking for a relaxing puzzle-based experience, The Gecko
          Gods might just be one to add to your wishlist. Playing as a little
          gecko, you can explore a mysterious island and make the most of the
          lizard's agile movements to climb cliffs and yes, even eat bugs.
          Setting out on a quest to save their friend, The Gecko Gods sees you
          solve puzzles across crumbling ruins and discover the lore of the land
          as you explore. There's no way we can pass up the chance to play as a
          little gecko protagonist.
        </p>
      </div>
      <div className={styles.newsInfo}>
        <h4>The Mermaid's Tongue</h4>
        <p className={styles.releaseInfo}>
          Release date: TBC 2024 <br /> Platform(s): PC, Xbox Series X/S, PS5
        </p>
        <p>
          The Mermaid's Tongue is a follow-up to the excellent 2019
          murder-mystery detective game, Tangle Tower from developer SFB Games.
          Bringing back main sleuths Detective Grimoire and Sally, you'll set
          out with the pair set to investigate the murder of Magnus Mortuga, who
          was the captain of the "world's strangest submarine". Strange things
          are evidently going on, with the mention of a possible curse. How
          intriguing. As you hunt for clues, you'll be able to once again
          interact with a variety of objects, which are all now in 3D, and try
          to complete puzzles as you try to get to the bottom of the case. With
          a free demo currently on Steam, the new detective adventure looks set
          to scratch our gumshoe itch.
        </p>
      </div>
      <div className={styles.newsInfo}>
        <h4>Duck Detective: The Secret Salami</h4>
        <p className={styles.releaseInfo}>
          Release date: TBC 2024 <br /> Platform(s): PC, Xbox Series X/S, PS5
        </p>
        <p>
          Ghost Bike is a new adventure from Nidhogg developer, Messhof. Playing
          as a streetwise kid from Freehub City, you set out to bring back Ghost
          Bikes, who are said to be magical couriers that rode between the world
          of the living and the world of the dead. With races along with a
          variety of different challenges to take on, you can explore what is
          described as a "semi open-world" and discover bike parts to customize
          your pair of wheels. It looks like one very stylized, intriguing
          action-adventure with a unique concept at its heart.
        </p>
      </div>
    </div>
  );
};

export default Newsfeed;
