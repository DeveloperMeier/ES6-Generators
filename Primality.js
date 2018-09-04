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

// To actually run it.
for (let x of p.allPrimes(26710122)) {
    console.log(x)
}

 
