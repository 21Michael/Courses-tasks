let booksArray = [{
        id: 1,
        name: 'Dune',
        autor: 'Frank Herbert',
        image: 'https://m.media-amazon.com/images/I/41UZeCEKOBL.jpg',
        plot: `Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family 
        tasked with ruling an inhospitable world
        where the only thing of value is the “spice” melange, a drug capable of extending life and 
        enhancing consciousness. 
        Coveted across the known universe,
        melange is a prize worth killing for....

        When House Atreides is betrayed,
        the destruction of Paul’ s family will set the boy on a journey toward a destiny greater than he
         could ever have imagined.And as he evolves into the
         mysterious man known as Muad’ Dib,
        he will bring to fruition humankind’ s most ancient and unattainable dream.

        A stunning blend of adventure and mysticism,
        environmentalism and politics,
        Dune won the first Nebula Award,
        shared the Hugo Award,
        and formed the basis of what is undoubtedly the grandest epic in science fiction.
    	`
    },
    {
        id: 2,
        name: 'The Dutch House: A Novel',
        autor: 'Ann Patchett',
        image: 'https://m.media-amazon.com/images/I/51YP8NqVZ9L.jpg',
        plot: `At the end of the Second World War, Cyril Conroy combines luck and a single canny investment to
         begin an enormous real estate empire, propelling
        his family from poverty to enormous wealth. His first order of business is to buy the Dutch House, a
         lavish estate in the suburbs outside of
         Philadelphia. Meant as a surprise for his wife, the house sets in motion the undoing of everyone he loves.

        The story is told by Cyril’ s son Danny,
        as he and his older sister,
        the brilliantly acerbic and self - assured Maeve,
        are exiled from the house where they grew up by their stepmother.The two wealthy siblings are thrown
         back into the poverty their parents had escaped 
        from and find that all they have to count on is one another.It is this unshakeable bond between them 
        that both saves their lives and thwarts their
         futures.

        Set over the course of five decades,
        The Dutch House is a dark fairy tale about two smart people who cannot overcome their past.Despite 
        every outward sign of success,
        Danny and Maeve are only truly comfortable when they’ re together.Throughout their lives they
        return to the well - worn story of what they’ ve lost with humor and rage.But when at last they’ 
        re forced to confront the people who left them behind,
        the relationship between an indulged brother and his ever - protective sister is
        finally tested.
        `
    },
    {
        id: 3,
        name: 'American Dirt',
        autor: 'JEANINE CUMMINS',
        image: 'https://m.media-amazon.com/images/I/81iVsj91eQL._SX140_.jpg',
        plot: `Lydia Quixano Pérez lives in the Mexican city of Acapulco. She runs a bookstore. She has a
         son, Luca, the love of her life, and a wonderful
         husband who is a journalist. And while there are cracks beginning to show in Acapulco because of 
         the drug cartels, her life is, by and large, fairly 
         comfortable.

Even though she knows they’ll never sell, Lydia stocks some of her all-time favorite books in her store.
 And then one day a man enters the shop to browse and
 comes up to the register with a few books he would like to buy—two of them her favorites. Javier is erudite. 
 He is charming. And, unbeknownst to Lydia, he is
 the jefe of the newest drug cartel that has gruesomely taken over the city. When Lydia’s husband’s tell-all
  profile of Javier is published, none of their lives
 ill ever be the same.

Forced to flee, Lydia and eight-year-old Luca soon find themselves miles and worlds away from their comfortable
 middle-class existence. Instantly transformed into
migrants, Lydia and Luca ride la bestia—trains that make their way north toward the United States, which is the
 only place Javier’s reach doesn’t extend. As 
they join the countless people trying to reach el norte, Lydia soon sees that everyone is running from something.
 But what exactly are they running to?`
    }
];

if (!localStorage.localBooksArray) {
    localStorage.localBooksArray = JSON.stringify(booksArray);
}