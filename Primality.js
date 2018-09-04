class Generators {
    // GENERATORS AND GENERATION METHODS
    // Infinite Iterables/Lazy Streams

    // No work is being done in the constructor
    // this is all generators.
    constructor() {
        // Generate all natural numbers starting at optional starting point, or 1 by default
        this.nat = function* nat(start = 1) {
            let i = start
            while (true) {
                yield i++
            }
        }

        this.rand = function* rand(end) {
            while (true) {
                yield Math.floor(Math.random() * Math.floor(end))
            }   
        }
                
        // Generate all natural numbers up to max
        this.natLimit = function* natLimit(max) {
            for (let x of nat()) {
                if (x <= max) yield x
            }
        }

        // Generate Numbers in Range
        this.range = function* range(lo, hi) {
            while (lo <= hi) {
                yield lo++
            }
        }

        // Filter generator functions
        this.filter = function* filter(it, f) {
            for (let x of it) {
                if (f(x)) {
                    yield x
                }
            }
        }

        // Opposite of filter
        this.filterNot = function* filterNot(it, f) {
            return this.filter(it, x => !f(x))
        }

        // Transform Generator values
        this.map = function* map(it, f) {
            for (let x of it) {
                yield f(x)
            }
        }

        // True if all Iterable values meet critera `f`
        this.forall = function forall(it, f) {
            for (let x of it) {
                if (!f(x)) {
                    return false
                }
            }
            return true
        }
    }
}


class Prime {
    // No work is being done in the constructor
    // this is all generators.
    constructor() {
        this.g = new Generators
        // Generator for Prime numbers
        this.allPrimes = function* allPrimes(startAt = 0) {
            for (let x of this.g.map(this.g.nat(startAt), x => { return {
                isPrime: this.isPrime(x),
                value: x
            }})) {
                if (x.isPrime) yield x.value
            }
        }

        this.randomPrimes = function* randomPrimes() {
            for (let x of this.g.map(this.g.rand(2999999999999999), x => [this.isPrime(x), x])) {
                if (x[0]) yield x[1]
            }
        }

        this.randomComposite = function* randomComposite() {
            const primes = this.randomPrimes(99999999999999) 
            for (let x of primes) {
                const next = primes.next().value
                yield {
                    composite: x*next,
                    prime1: x,
                    prime2: next,
                    proof: ((x*next)/ x == next) ? 
                            `composite ${x*next} is composed of ${x}, and ${next}.[${(x*next)/x == next}]` :
                            'Cannot Prove. Precision Lost'
                }
            }
        }

        // Calculate if number is prime
        this.isPrime = function isPrime(toFactor) {
            const max = Math.ceil(Math.sqrt(toFactor + 1))
            if (toFactor == 1 || toFactor == 2 || toFactor == 3 || toFactor == 5) return true // Shortcut for easy values
            if (toFactor % 2 == 0 || toFactor % 3 == 0|| toFactor % 5 == 0) return false // Completely remove need to process evens, divisible by 3, and divisble by 5
            return this.g.forall(this.g.range(6, max + 1), x => toFactor % x)
        }
    }
}


const p = new Prime

// // Generate primes starting at count
// for (let x of p.allPrimes(99999999999999)) {
//     console.log(x)
// }

// // Generate Random Composite numbers
for (let x of p.randomComposite()) {
    console.log(x)
}

 
