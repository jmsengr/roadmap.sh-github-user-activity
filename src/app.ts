import { createInterface } from "readline";
import kleur from "kleur";
import axios from "axios";

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

function prompt() {
	rl.question("> ", async (input: string) => {
		if (input.trim() === "exit") {
			console.log(kleur.green("Program exit"));
			rl.close();
			return;
		}

		if (input.trim().length <= 0) {
			console.clear();
			console.log(kleur.red("No command input"));
			prompt();
		}

		const flags: string[] = input.trim().split(" ");

		if (flags[0] !== "github-activity") {
			console.clear();
			console.log(kleur.red("Invalid flags"));
			prompt();
		} else if (flags.length === 1) {
			console.clear();
			console.log(kleur.red("Missing 2nd flag"));
			prompt();
		}

		const response = await axios.get();
	});
}

prompt();
