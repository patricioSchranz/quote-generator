// -------------------------------
// DOM ELEMENTS
// -------------------------------

const
    quoteCard = document.querySelector('.quote_card'),
    quoteDisplay = document.querySelector('.quote_quote'),
    authorDisplay = document.querySelector('.quote_author'),

    newQuoteButton = document.querySelector('.quote_new-quote-btn'),
    twitterButton = document.querySelector('.quote_twitter-btn'),
    whatsAppButton = document.querySelector('.quote_whats-app')

    loader = document.querySelector('.loader')



// -------------------------------
// CALLBACK FUNCTIONS
// -------------------------------

const spinnerShown = ()=>{
    loader.hidden = false
    quoteCard.hidden = true
}

const spinnerHidden = ()=>{
    loader.hidden = true
    quoteCard.hidden = false
}

const writeQuote = async (response) =>{
    const 
        quoteArray = await response.json(),
        randomQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)]

    // console.log('random qupote =>', randomQuote)

    quoteCard.dataset.category = randomQuote.tag
    quoteDisplay.innerHTML = randomQuote.text
    authorDisplay.innerHTML = randomQuote.author
    spinnerHidden()
}

const throwError = (response)=>{
    console.log('resonse =>', response.status)
    throw new Error('Uups, something going wrong - STATUSCODE: \n' +  response.status)
}

// -------------------------------
// FETCHING
// -------------------------------

const getQuote = async ()=>{
    spinnerShown()
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'

    try{
        const response = await fetch(apiURL)
        // console.log('response => \n', response.status)

        response.ok
        ? writeQuote(response)
        : throwError(response)
    }
    catch(error){
        spinnerHidden()
        quoteDisplay.innerHTML = error
        authorDisplay.innerHTML = 'Admin'
    }
}

getQuote()



// -------------------------------
// Event Listeners
// -------------------------------

newQuoteButton.addEventListener('click', ()=>{
    location.reload()
})

twitterButton.addEventListener('click', ()=>{
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteDisplay.innerHTML} - ${authorDisplay.innerHTML}`;
    window.open(twitterUrl, '_blank');
})

whatsAppButton.addEventListener('click', ()=>{
    const
        encodedText = encodeURIComponent(quoteDisplay.innerHTML),
        encodedAuthor = encodeURIComponent(authorDisplay.innerHTML),
        whatsAppUrl = `whatsapp://send?text=${encodedText}-${encodedAuthor}`

        // console.log('encoded text =>', encodedText)
        // console.log('encoded author', encodedAuthor)
        location.href = whatsAppUrl
})
