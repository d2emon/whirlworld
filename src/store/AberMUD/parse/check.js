function chklist(word, list) {
  var b = 0
  var c = 0
  var d = null
  for(var a = 0; a < list.length; a++) {
    b = match(word.toLowerCase(), list[a])
    if (b > c) {
      c = b
      d = a
    }
  }
  if (c < 5) return null /* No good matches */
  return d
}

function match(x, y) {
  var c = 0
  if (x == y) return 10000
  if (y == "reset") return -1
  if (!x) return 0

  for(var n = 0; n < x.length && n < y.length; n++) {
    if (x[n] == y[n]) {
      if (n == 0) c += 2
      if (n == 1) c += 1
      c++
    }
  }
  return c
}
