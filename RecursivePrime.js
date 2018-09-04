// GENERATORS AND GENERATION METHODS
// Infinite Iterables/Lazy Streams

// Generate all natural numbers starting at optional starting point, or 1 by default
function* nat(start = 1) {
    let i = start
    while (true) {
        yield i++
    }
}
        
// Generate all natural numbers up to max
function* natLimit(max) {
   for (let x of nat()) {
       if (x <= max) yield x
   }
}

// Filter generator functions
function* filter(it, f) {
    for (let x of it) {
        if (f(x)) {
            yield x
        }
    }
}

// Opposite of filter
function* filterNot(it, f) {
    return filter(it, x => !f(x))
}

// Transform Generator values
function* map(it, f) {
    for (let x of it) {
        yield f(x)
    }

}

// Generate Numbers in Range
function* range(lo, hi) {
    while (lo <= hi) {
        yield lo++
    }
}

// Generator for Prime numbers
function* allPrimes(startAt = 0) {
    for (let x of map(nat(startAt), x => { return {
        isPrime: isPrime(x),
        value: x
    }})) {
        if (x.isPrime) yield x.value
    }
}

// FP Methods for Generators
// Calculate if number is prime
function isPrime(toFactor) {
    const max = Math.ceil(Math.sqrt(toFactor + 1))
    if (toFactor == 1 || toFactor == 2 || toFactor == 3 || toFactor == 5) return true // Shortcut for easy values
    if (toFactor % 2 == 0 || toFactor % 3 == 0|| toFactor % 5 == 0) return false // Completely remove need to process evens, divisible by 3, and divisble by 5
    return forall(range(6, max + 1), x => toFactor % x)
}

// True if all Iterable values meet critera `f`
function forall(it, f) {
    for (let x of it) {
        if (!f(x)) {
            return false
        }
    }
    return true
}

// To actually run it.
for (let x of allPrimes(2000000000000000)) {
    console.log(x)
}

 
