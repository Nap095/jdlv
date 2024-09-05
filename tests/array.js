tableau = ["az", "er", "ty"]

document.addEventListener('DOMContentLoaded', function() {
    var diva = document.getElementById("diva")
    diva.textContent = tableau

    tableau = redef1(tableau)

    var divb = document.getElementById("divb")
    divb.textContent = tableau

    tableau = redef2(tableau)

    var divc = document.getElementById("divc")
    divc.textContent = tableau
})

function redef1() {
    var t = ["01", "23", "45", "67", "89"]
    return t
}

function redef2() {
    var t = new Array(3)
    t[0] = ["q", "s", "d"]
    t[1] = ["f", "g", "h"]
    t[2] = ["k", "l", "m"]
    return t
}
