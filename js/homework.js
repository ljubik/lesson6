function square_equation() {
var a = Number (prompt("Enter a"));
var b = Number (prompt("Enter b"));
var c = Number (prompt("Enter b"));
            var sol = document.getElementById("square_sol");
            var d = b * b - 4 * a * c;
            if (d < 0) {
                string = "<br>x1 = (";
                string += -b / (2 * a);
                string += ", ";
                string += Math.sqrt(-d) / (2 * a);
                string += "), x2 = (";
                string += -b / (2 * a);
                string += ", ";
                string += -Math.sqrt(-d) / (2 * a);
                string += ").";
            }
            else {
                if (d == 0) {
                    string = "<br><b>x1 = x2 =</b> ";
                    string += -b / (2 * a);
                    string += ".";
                }
                else {
                    string = "<br>x1 = ";
                    string += -b / (2 * a) - Math.sqrt(d) / (2 * a);
                    string += ", x2 = ";
                    string += -b / (2 * a) + Math.sqrt(d) / (2 * a);
                    string += ".";
                }
            }
            sol.innerHTML = string;
        }



// if (a >= 0, b >= 0, c >= 0) {
//     document.write('<p>' + a + 'x<sup>2</sup>+' + b + 'x+' + c + '=0 a >= 0, b >= 0, c >= 0+');
// }
// else {
//     if (b < 0, c < 0) {
//         document.write('<p>' + a + 'x<sup>2</sup>' + b + 'x' + c + '=0 b < 0, c < 0+');
//     }
//     else {
//         if (b > 0) {
//             document.write('<p>' + a + 'x<sup>2</sup>+' + b + 'x+' + c + '=0 b > 0');
//         }
//         else {
//             if (b > 0, c < 0) {
//                 document.write('<p>' + a + 'x<sup>2</sup>+' + b + 'x' + c + '=0 b > 0, c < 0');
//             }
//         }
//     }
// }
