import { createInterface } from "readline";
import kleur from "kleur";
const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});
function prompt() {
    rl.question("> ", async (input) => {
        if (input.trim() === "exit") {
            rl.close();
            return;
        }
        if (input.trim() === "") {
            console.log(kleur.red("Invalid command"));
            prompt();
        }
    });
}
prompt();
