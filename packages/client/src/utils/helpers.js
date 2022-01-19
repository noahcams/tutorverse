export function calculateAverage(grades) {
    let average = 0
    grades.forEach(g => average += g.grade)
    return average / grades.length
}