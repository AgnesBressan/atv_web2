class DogBreed {
    constructor(id, breed) {
        this.id = id
        this.breed = breed
    }
}

const breeds = [ new DogBreed(1, "Brazilian Caramelo"), 
    new DogBreed(2, "Chinese Dotted"), new DogBreed(3, "Cheetos"),
    new DogBreed(4, "Salsichinha Hot-Dog"), new DogBreed(5, "Demon Tasmanian Pischer") ]

function findAll() {
    return breeds
}

function findById(id) {
    const result = breeds.find(breed => id == breed.id)
    return result
}

function create(breed) {
    const id = breeds.length + 1
    const newBreed = new DogBreed(id, breed)
    breeds.push(newBreed)
    return newBreed
}

export default { findAll, findById, create }