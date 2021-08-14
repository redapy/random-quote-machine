import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const QuoteBox = () => {
    var colors = [
        '#16a085',
        '#27ae60',
        '#2c3e50',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        '#342224',
        '#472E32',
        '#BDBB99',
        '#77B1A9',
        '#73A857'
      ];

    const [quote, setQuote] = useState([]);
    const [color, setColor] = useState('#73A857');
    const [isPending, setIsPending] = useState(true);

    const handleClick = () => {
        fetch("https://type.fit/api/quotes")
        .then(res => res.json())
        .then( data =>
            setQuote(data[Math.floor(Math.random()*data.length)])
        )

        setColor(colors[Math.floor(Math.random()*colors.length)])
        
    }

    useEffect(() => {
        fetch("https://type.fit/api/quotes")
        .then(res => res.json())
        .then( data =>
            {
                setQuote(data[Math.floor(Math.random()*data.length)]);
                setIsPending(false)
            }
        )
    }, []);

    return ( 
        <div style={{backgroundColor: color}} className="wrapper">
            <motion.div id="quote-box"
             initial={{x: '100vw'}}
             animate={{x:0}}
             transition={{delay: 0.5, type: 'tween', duration:2}}
            >
                {isPending && <div>Loading...</div>}
                <h1 style={{color: color}} id="text">{quote.text}</h1>
                <p id="author">-by {quote.author}</p>
                <div className="flex">
                    <a id="tweet-quote" class="btn-floating btn btn-tw" type="button" role="button" title="Share on twitter"
                    href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fparse.com"
                    rel="noopener"
                    target="_blank">
                    <i class="fab fa-2x fa-twitter"> Tweet it</i>
                    </a>
                    <motion.button style={{backgroundColor: color}} id="new-quote" onClick={handleClick} 
                     whileHover={{ 
                        scale: 1.2, 
                        textShadow: "0px 0px 8px rgb(255,255,255)",
                        boxShadow: "0px 0px 8px rgb(255,255,255)",
                      }}
                    >
                    New Quote
                    </motion.button>
                </div>
            </motion.div>
        </div>
     );
}
 
export default QuoteBox;