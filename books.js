fetch("shelf.json")
    .then((res) => res.json())
    .then((shelf) => {
        let delay = 0;

        shelf.forEach((book) => {
            setTimeout(() => {
                const title = str2url(book.title);
                const url = `https://openlibrary.org/search.json?q=${title}`;

                fetch(url)
                    .then((res) => res.json())
                    .then((data) => {
                        document.querySelector("main").append(loadBook(book, data.docs[0]));
                        console.log(data);
                    })
                    .catch((error) => console.error("API Error:", error));
                    
            }, delay);

            delay += 500; // Wait 1 second between requests
        });
    });

function str2url( str ) {
    return str.toLowerCase().replaceAll(' ', '+').replaceAll('.','')
}

function loadBook( book, data ) {

    const card = newEl( 'div', 'book' )

    const cover = newEl( 'img', 'book-cover' )
    cover.src = `https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg`

    const cred = newEl( 'div', 'book-info' )

    const title = newEl( 'h3', 'book-title', `${book.title}` )
    const author = newEl( 'p', 'book-author', `${book.author}` )

    cred.append( title, author )
    card.append (cover, cred )

    return card

}

function newEl( tag, classes, textContent ) {

    const el  = document.createElement( tag )

    if ( classes !== null ) {

        if ( Array.isArray( classes ) ) {
            classes.forEach( c => 
                el.classList.add( c )
            )

        } else {
            el.classList.add( classes )
        }
    }

    if ( textContent !== null ) {
        el.textContent = textContent
    }

    return el

}